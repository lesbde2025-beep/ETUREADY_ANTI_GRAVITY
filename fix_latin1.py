import os

# List of files to check
files = [f for f in os.listdir('.') if f.endswith('.html')]

for filename in files:
    try:
        with open(filename, 'rb') as f:
            content = f.read()
            
        # Check if it looks like Latin1 (has bytes > 127 and is not valid utf-8)
        try:
            content.decode('utf-8')
            # If it decodes as UTF-8, it might still be Latin1 if it has no special chars, 
            # or it is already fixed.
            # But if it has "Nº1" as \xba, it will FAIL decode('utf-8').
            print(f"{filename} seems valid UTF-8 (or ASCII). Skipping.")
            continue
        except UnicodeDecodeError:
            pass # It's not valid UTF-8, so likely Latin1
            
        # Decode as Latin1
        text = content.decode('latin1')
        
        # Write back as UTF-8
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(text)
            
        print(f"Fixed {filename} (Latin1 -> UTF-8)")
        
    except Exception as e:
        print(f"Could not fix {filename}: {e}")
