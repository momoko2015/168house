const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let conversation_id = null;

// Configure Marked.js Options
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    },
    breaks: true
});

// Auto-resize textarea
userInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    sendBtn.disabled = this.value.trim() === '';
});

// Send message on Enter (but require Shift+Enter for new line)
userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

sendBtn.addEventListener('click', sendMessage);

function showLoading() {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message assistant loading-message`;
    messageDiv.innerHTML = `
        <div class="content markdown-body">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    chatContainer.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';
    sendBtn.disabled = true;

    // Show loading state
    const loadingEl = showLoading();

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: text,
                conversation_id: conversation_id
            })
        });

        // Remove loading state
        loadingEl.remove();

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.detail || `API Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.conversation_id) {
            conversation_id = data.conversation_id;
        }

        // Render response
        if (data.thoughts && data.thoughts.length > 0) {
            // Optional: Format tool calls if they are passed in thoughts
            let formattedResponse = ``;
            // For now, we just output the markdown text response.
            // A more advanced integration would render the thoughts as expandable elements.
        }

        addMessage(data.response, 'assistant');

    } catch (error) {
        loadingEl.remove();
        addMessage(`**Error:** ${error.message}`, 'system');
        console.error(error);
    }
}

function addMessage(text, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = role === 'user' ? 'content' : 'content markdown-body';

    if (role === 'user') {
        const p = document.createElement('p');
        p.textContent = text;
        contentDiv.appendChild(p);
    } else {
        // Parse Markdown for assistant/system
        contentDiv.innerHTML = marked.parse(text);
    }

    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);

    scrollToBottom();
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
