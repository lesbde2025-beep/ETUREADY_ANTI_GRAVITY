import os

# List of files to check (all html except index.html which is known good)
files = [f for f in os.listdir('.') if f.endswith('.html') and f != 'index.html']

for filename in files:
    try:
        with open(filename, 'rb') as f:
            content = f.read()
        
        # Decode as utf-8 to get the mojibake string
        text = content.decode('utf-8')
        
        # Encode as cp1252 (Windows-1252) to recover the original bytes
        # This reverses the "Read as CP1252, Write as UTF-8" error
        original_bytes = text.encode('cp1252')
        
        # Verify it's valid utf-8
        original_bytes.decode('utf-8')
        
        # Write back
        with open(filename, 'wb') as f:
            f.write(original_bytes)
            
        print(f"Fixed {filename}")
        
    except Exception as e:
        print(f"Could not fix {filename}: {e}")
