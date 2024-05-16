import { useState } from "react"
import useShowToast from "./useShowToast"

const usePreviewImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSize = 2 * 1024 * 1024   // in bytes(2MB)

    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if (file && file.type.startsWith('image/')) {

            if (file.size > maxFileSize) {
                showToast("Error", "File size must be less than 2MB", "error");
                setSelectedFile(null);
                return;
            }

            const reader = new FileReader();  // This object will be used to read the contents of the file asynchronously.

            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }
            /*The onloadend event handler is assigned to the FileReader object.
             This event fires when the file reading operation is completed, whether successfully or not.
             In this case, when the file reading is finished, the arrow function is called.  */

            reader.readAsDataURL(file);
            /*This line triggers the FileReader object to start reading the contents of the file specified by the file variable. 
            The readAsDataURL() method is used to read the file as a data URL, 
            which represents the file's data as a base64-encoded string. */
        }
        else {
            showToast("Error", "Please select an image file", "error");
            setSelectedFile(null);
        }


    }
    return { selectedFile, handleImageChange, setSelectedFile };
}

export default usePreviewImage;