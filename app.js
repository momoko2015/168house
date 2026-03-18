<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elite Estates Admin - Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="utils.js"></script>
    <style>
        :root {
            --sidebar-width: 260px;
        }

        body {
            display: flex;
            min-height: 100vh;
            background: #0f172a;
        }

        /* Sidebar */
        .sidebar {
            width: var(--sidebar-width);
            height: 100vh;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(20px);
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            padding: 30px 20px;
            z-index: 100;
        }

        .admin-logo {
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            gap: 12px;
            color: white;
        }

        .nav-list {
            list-style: none;
            flex-grow: 1;
        }

        .nav-item {
            margin-bottom: 8px;
        }

        .nav-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 15px;
            color: #94a3b8;
            text-decoration: none;
            border-radius: 12px;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .nav-link:hover, .nav-link.active {
            background: rgba(114, 50, 242, 0.1);
            color: var(--accent-color);
        }

        .nav-link.active i {
            color: var(--accent-color);
        }

        /* Main Content */
        .main-content {
            margin-left: var(--sidebar-width);
            flex-grow: 1;
            padding: 40px;
        }

        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }

        .admin-profile {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .admin-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid var(--accent-color);
        }

        /* Stats Cards */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 25px;
            border-radius: 20px;
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.05);
        }

        .stat-card i {
            font-size: 1.5rem;
            color: var(--accent-color);
            margin-bottom: 15px;
            display: block;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 5px;
        }

        .stat-label {
            color: #94a3b8;
            font-size: 0.9rem;
        }

        /* Recent Activity */
        .content-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            padding: 30px;
            margin-bottom: 30px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: left;
            padding: 15px;
            color: #94a3b8;
            font-weight: 500;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        td {
            padding: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .status-badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .status-unread { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .status-read { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

        .btn-view {
            padding: 6px 12px;
            font-size: 0.8rem;
        }

        #loginOverlay {
            position: fixed;
            inset: 0;
            z-index: 2000;
            background: #0f172a;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
    </style>
</head>

<body>
    <!-- Simple Admin Login Guard -->
    <div id="loginOverlay">
        <div class="auth-card" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 50px; border-radius: 24px;">
            <div class="admin-logo" style="justify-content: center; margin-bottom: 30px;">
                <i class="fas fa-user-shield" style="color: var(--accent-color); font-size: 2.5rem;"></i>
                <span style="font-size: 2rem;">Elite Admin</span>
            </div>
            <div class="form-group">
                <label>Access Pin</label>
                <input type="password" id="adminPin" placeholder="Enter Admin Pin" style="text-align: center; font-size: 1.5rem; letter-spacing: 5px;">
            </div>
            <button class="btn-primary" onclick="checkAdmin()" style="width: 100%; height: 55px; margin-top:20px;">Unlock Dashboard</button>
            <p id="errorMsg" style="color: #ef4444; margin-top: 15px; display: none;">Invalid PIN. Access Denied.</p>
        </div>
    </div>

    <aside class="sidebar">
        <div class="admin-logo">
            <i class="fas fa-gem" style="color: var(--accent-color);"></i>
            <span>EliteEstates</span>
        </div>
        <ul class="nav-list">
            <li class="nav-item"><a href="#" class="nav-link active" onclick="showTab('dashboard')"><i class="fas fa-th-large"></i> Dashboard</a></li>
            <li class="nav-item"><a href="#" class="nav-link" onclick="showTab('properties')"><i class="fas fa-home"></i> Properties</a></li>
            <li class="nav-item"><a href="#" class="nav-link" onclick="showTab('inquiries')"><i class="fas fa-envelope"></i> Inquiries</a></li>
        </ul>
        <div style="margin-top: auto;">
            <a href="index.html" class="nav-link"><i class="fas fa-external-link-alt"></i> View Website</a>
            <a href="#" class="nav-link" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </aside>

    <main class="main-content">
        <header class="top-bar">
            <div>
                <h1 style="font-size: 1.8rem; font-weight: 800;">Admin Dashboard</h1>
                <p id="currentDate" style="color: #94a3b8; font-size: 0.9rem;"></p>
            </div>
            <div class="admin-profile">
                <div style="text-align: right;">
                    <div style="font-weight: 600;">System Administrator</div>
                    <div style="color: #4ade80; font-size: 0.75rem;"><i class="fas fa-circle" style="font-size: 0.5rem;"></i> Online</div>
                </div>
                <img src="https://ui-avatars.com/api/?name=Admin&background=7232f2&color=fff" class="admin-avatar">
            </div>
        </header>

        <div id="dashboardTab" class="admin-tab">
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-building"></i>
                    <div class="stat-value" id="totalProps">---</div>
                    <div class="stat-label">Total Properties</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-crown"></i>
                    <div class="stat-value" id="premiumCount">---</div>
                    <div class="stat-label">Premium Listings</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-paper-plane"></i>
                    <div class="stat-value" id="totalInq">---</div>
                    <div class="stat-label">Total Inquiries</div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-bell"></i>
                    <div class="stat-value" id="unreadCount" style="color: #ef4444;">---</div>
                    <div class="stat-label">Unread Messages</div>
                </div>
            </div>

            <div class="content-card">
                <div class="card-header">
                    <h2 style="font-size: 1.3rem;">Recent Inquiries</h2>
                    <button class="btn-outline" style="padding: 5px 15px; font-size: 0.8rem;" onclick="showTab('inquiries')">View All</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>Contact</th>
                            <th>Property ID</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="recentInquiriesTable">
                        <!-- Loaded dynamically -->
                    </tbody>
                </table>
            </div>
        </div>

        <div id="propertiesTab" class="admin-tab" style="display: none;">
             <div class="content-card">
                <div class="card-header">
                    <h2 style="font-size: 1.3rem;">Manage Properties (Top 50)</h2>
                    <div class="search-field" style="width: 300px;">
                        <input type="text" placeholder="Search by ID or title..." id="adminPropSearch">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="allPropertiesTable">
                        <!-- Loaded dynamically -->
                    </tbody>
                </table>
             </div>
        </div>

        <div id="inquiriesTab" class="admin-tab" style="display: none;">
             <div class="content-card">
                <div class="card-header">
                    <h2 style="font-size: 1.3rem;">All Inquiries</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sender</th>
                            <th>Email</th>
                            <th>Message Preview</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="fullInquiriesTable">
                        <!-- Loaded dynamically -->
                    </tbody>
                </table>
             </div>
        </div>
    </main>

    <script>
        const ADMIN_PIN = "8888"; // User can change this

        function checkAdmin() {
            const pin = document.getElementById('adminPin').value;
            if (pin === ADMIN_PIN) {
                document.getElementById('loginOverlay').style.display = 'none';
                localStorage.setItem('admin_session', 'true');
                initAdmin();
            } else {
                document.getElementById('errorMsg').style.display = 'block';
            }
        }

        function logout() {
            localStorage.removeItem('admin_session');
            window.location.reload();
        }

        function showTab(tab) {
            document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
            document.getElementById(tab + 'Tab').style.display = 'block';
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            event.currentTarget?.classList.add('active');
            
            if (tab === 'dashboard') loadStats();
            if (tab === 'properties') loadAllProperties();
            if (tab === 'inquiries') loadAllInquiries();
        }

        async function initAdmin() {
            if (localStorage.getItem('admin_session') !== 'true') return;
            document.getElementById('loginOverlay').style.display = 'none';
            document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            loadStats();
        }

        async function loadStats() {
            try {
                const res = await fetch(API_BASE + '/api/admin/stats');
                const data = await res.json();
                document.getElementById('totalProps').textContent = data.properties.toLocaleString();
                document.getElementById('premiumCount').textContent = data.premium_properties;
                document.getElementById('totalInq').textContent = data.inquiries;
                document.getElementById('unreadCount').textContent = data.unread_inquiries;
                
                // Also load recent inquiries
                loadRecentInquiries();
            } catch (err) { console.error(err); }
        }

        async function loadRecentInquiries() {
            try {
                const res = await fetch(API_BASE + '/api/inquiries');
                const data = await res.json();
                const tbody = document.getElementById('recentInquiriesTable');
                tbody.innerHTML = data.slice(0, 5).map(inq => `
                    <tr>
                        <td>${inq.name}</td>
                        <td>${inq.email}</td>
                        <td>#${inq.property_id}</td>
                        <td style="font-size: 0.8rem; color: #94a3b8;">${inq.date.split(' ')[0]}</td>
                        <td><span class="status-badge ${inq.is_read ? 'status-read' : 'status-unread'}">${inq.is_read ? 'Read' : 'Unread'}</span></td>
                    </tr>
                `).join('');
            } catch (err) { console.error(err); }
        }

        async function loadAllInquiries() {
            try {
                const res = await fetch(API_BASE + '/api/inquiries');
                const data = await res.json();
                const tbody = document.getElementById('fullInquiriesTable');
                tbody.innerHTML = data.map(inq => `
                    <tr>
                        <td>#${inq.id}</td>
                        <td>${inq.name}</td>
                        <td>${inq.email}</td>
                        <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${inq.message}</td>
                        <td><span class="status-badge ${inq.is_read ? 'status-read' : 'status-unread'}">${inq.is_read ? 'Read' : 'Unread'}</span></td>
                        <td>
                            <button class="btn-primary btn-view" onclick="markInquiryRead(${inq.id})">Mark Read</button>
                        </td>
                    </tr>
                `).join('');
            } catch (err) { console.error(err); }
        }

        async function loadAllProperties() {
            try {
                // Fetch top 50 to avoid massive DOM lag in admin
                const res = await fetch(API_BASE + '/api/properties?limit=50');
                const data = await res.json();
                const tbody = document.getElementById('allPropertiesTable');
                tbody.innerHTML = data.map(prop => `
                    <tr>
                        <td>#${prop.id}</td>
                        <td><img src="${prop.image}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;"></td>
                        <td style="font-weight: 500;">${prop.title.zh || prop.title.en}</td>
                        <td style="color: var(--accent-color);">${prop.price}</td>
                        <td><span style="opacity: 0.7; font-size: 0.8rem;">${prop.type}</span></td>
                        <td>
                            <div style="display: flex; gap: 8px;">
                                <button class="btn-icon" style="background: rgba(255,255,255,0.05);" onclick="deleteProp(${prop.id})"><i class="fas fa-trash" style="color: #ef4444; font-size: 0.8rem;"></i></button>
                                <a href="edit.html?id=${prop.id}" class="btn-icon" style="background: rgba(255,255,255,0.05); text-decoration: none; display: flex;"><i class="fas fa-edit" style="color: #4ade80; font-size: 0.8rem;"></i></a>
                            </div>
                        </td>
                    </tr>
                `).join('');
            } catch (err) { console.error(err); }
        }

        async function markInquiryRead(id) {
            try {
                await fetch(API_BASE + '/api/inquiries/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_read: 1 })
                });
                loadAllInquiries();
                loadStats();
            } catch (err) { console.error(err); }
        }

        async function deleteProp(id) {
            if (!confirm("Are you sure you want to delete this property permanentally?")) return;
            try {
                const res = await fetch(API_BASE + '/api/properties/' + id, { method: 'DELETE' });
                if (res.ok) loadAllProperties();
            } catch (err) { console.error(err); }
        }

        // Initialize on load
        if (localStorage.getItem('admin_session') === 'true') {
            initAdmin();
        }
    </script>
</body>

</html>
