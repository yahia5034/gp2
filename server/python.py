from PIL import Image
import pytesseract
import os
import json
import sys

# Set Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'C:/Users/Ahmed/AppData/Local/Programs/Tesseract-OCR/tesseract.exe'

def extract_text_from_image(filename):
    try:
        # Open the image file
        image = Image.open(filename)
        
        # Perform OCR to extract text
        text = pytesseract.image_to_string(image)
        
        return text.strip()  # Return only the extracted text
    
    except Exception as e:
        print(f"Error extracting text from image: {e}")
        return None

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'Please provide the path to the image file.'}))
        sys.exit(1)
    
    filename = sys.argv[1]
    extracted_text = extract_text_from_image(filename)
    
    if extracted_text:
        result = {
            'text': extracted_text
        }
        print(json.dumps(result))
    else:
        print(json.dumps({'error': 'No text extracted from the image.'}))
