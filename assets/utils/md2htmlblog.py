import re
import argparse
import os

def wrap_paragraphs(markdown_content):
    lines = markdown_content.split('\n')
    modified_lines = []
    in_code_block = False
    in_list = False
    
    for line in lines:
        # Detect the start of a code block (```bash)
        if line.strip().startswith('```bash'):
            if not in_code_block:
                modified_lines.append('<pre class="command-line" data-user="" data-host=""><code class="language-commandline">')
            in_code_block = True
            continue
        
        # Detect the end of a code block (```)
        if line.strip() == '```' and in_code_block:
            modified_lines.append('</code></pre>')
            in_code_block = False
            continue
        
        # Inside code block, add line as-is
        if in_code_block:
            modified_lines.append(line)
            continue
        
        # Handle image links (like ![alt-text](image-url))
        if line.strip().startswith('!['):
            match = re.match(r'!\[(.*?)\]\((.*?)\)', line.strip())
            if match:
                alt_text, image_url = match.groups()
                modified_lines.append(
                    f'<div class="workshowcase-img-container">\n'
                    f'  <img class="img-fluid" src="{image_url}" alt="{alt_text}" />\n'
                    f'</div>'
                )
            continue
        
        # Handle list items (bullets or numbered)
        if line.strip().startswith(('- ', '* ', '1. ', '2. ', '3. ', '4. ', '5. ', '6. ', '7. ', '8. ', '9. ')):
            in_list = True
            modified_lines.append(line)
            continue
        elif in_list and not line.strip():
            in_list = False
        
        # Wrap non-list and non-image lines in <p> tags
        if line.strip() and not line.strip().startswith(('#', '![', '- ', '* ', '1. ', '2. ', '3. ', '4. ', '5. ', '6. ', '7. ', '8. ', '9. ')):
            modified_lines.append(f'<p class="blog-post_paragraph">{line}</p>')
        else:
            modified_lines.append(line)
    
    return '\n'.join(modified_lines)

def process_markdown_file(input_file, output_file):
    if not input_file.lower().endswith('.md'):
        print("Error: Input file must be a markdown (.md) file.")
        return
    
    with open(input_file, 'r', encoding='utf-8') as file:
        markdown_content = file.read()
    
    modified_content = wrap_paragraphs(markdown_content)
    
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(modified_content)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Process a markdown file and wrap paragraphs with HTML tags.")
    parser.add_argument("input_file", help="Path to the input markdown file.")
    parser.add_argument("output_file", nargs="?", default="output.md", help="Path to the output file (default: output.md)")
    
    args = parser.parse_args()
    
    process_markdown_file(args.input_file, args.output_file)
    print(f"Processed '{args.input_file}' and saved output to '{args.output_file}'")
