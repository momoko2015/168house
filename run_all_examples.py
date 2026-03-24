"""
Run all AI examples sequentially
"""
import sys
import subprocess
import time


def run_script(script_name, description):
    """Run a Python script and display results"""
    print("\n" + "=" * 60)
    print(f"Running: {description}")
    print("=" * 60)
    
    try:
        result = subprocess.run(
            [sys.executable, script_name],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        if result.stdout:
            print(result.stdout)
        
        if result.stderr:
            print("Errors/Warnings:", file=sys.stderr)
            print(result.stderr, file=sys.stderr)
        
        if result.returncode == 0:
            print(f"✓ {description} completed successfully")
        else:
            print(f"✗ {description} failed with return code {result.returncode}")
        
        return result.returncode == 0
    
    except subprocess.TimeoutExpired:
        print(f"✗ {description} timed out")
        return False
    except Exception as e:
        print(f"✗ Error running {description}: {e}")
        return False


def main():
    """Run all example scripts"""
    print("=" * 60)
    print("AI Scripts - Running All Examples")
    print("=" * 60)
    
    scripts = [
        ("ai_utilities.py", "AI Utilities"),
        ("ml_model.py", "Machine Learning Model"),
        ("neural_network.py", "Neural Network"),
        ("image_classifier.py", "Image Classifier"),
    ]
    
    # Note: chatbot.py requires API key, so we'll skip it or make it optional
    print("\nNote: chatbot.py requires OPENAI_API_KEY and will be skipped")
    print("Note: api_server.py is a server and should be run separately")
    
    results = []
    
    for script, description in scripts:
        success = run_script(script, description)
        results.append((description, success))
        time.sleep(1)  # Brief pause between scripts
    
    # Summary
    print("\n" + "=" * 60)
    print("Summary")
    print("=" * 60)
    
    for description, success in results:
        status = "✓ PASSED" if success else "✗ FAILED"
        print(f"{status}: {description}")
    
    total = len(results)
    passed = sum(1 for _, success in results if success)
    
    print(f"\nTotal: {passed}/{total} passed")
    
    if passed == total:
        print("\n🎉 All examples completed successfully!")
    else:
        print(f"\n⚠️  {total - passed} example(s) had issues")


if __name__ == "__main__":
    main()

