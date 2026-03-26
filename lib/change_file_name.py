from pathlib import Path
import os

# Supported image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}

# Get the current directory
curdir = Path(__file__).parent.parent

# Define the directory containing the images
images_dir = curdir.joinpath("public/static/vehicle_images")

# List to store renamed file paths
renamed_files_list = []

def rename_files(directory):
    # Walk through the directory and its subdirectories
    for dirpath, _, filenames in os.walk(directory):
        # Get the name of the current directory
        dir_name = os.path.basename(dirpath)
        
        # Initialize a counter for the sequential number
        counter = 1
        
        # Iterate over each file in the current directory
        for filename in filenames:
            # Get file extension in lowercase
            file_ext = os.path.splitext(filename)[1].lower()
            
            if file_ext in IMAGE_EXTENSIONS:
                # Create the new filename (dir-name_number.ext)
                new_filename = f"{dir_name}_{counter}{file_ext}"
                
                # Get the full path of the old and new file
                old_file = os.path.join(dirpath, filename)
                new_file = os.path.join(dirpath, new_filename)
                
                try:
                    # Rename the file
                    os.rename(old_file, new_file)
                    # Add the new file path to the list
                    renamed_files_list.append(f"/static/vehicle_images/{dir_name}/{new_filename}")
                    counter += 1
                except Exception as e:
                    print(f"Error renaming {filename}: {e}")

# Call the function to rename files
rename_files(images_dir)

# Print the renamed files list in the desired format
print("images: [")
for file_path in renamed_files_list:
    print(f"      '{file_path}',")
print("],")