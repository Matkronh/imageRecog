import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import styles from '../styles/imgrec.module.css';
import Spreadsheet from "react-spreadsheet";

function UploadBlock() {
    const [previewImage, setPreviewImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [data, setData] = useState([
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
        Array(12).fill({ value: "" }),
    ]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            extractTextFromImage(imageUrl);
        }
    };

    const extractTextFromImage = (imageUrl) => {
        Tesseract.recognize(
            imageUrl,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            setExtractedText(text);
            // Split the extracted text into words
            const words = text.trim().replace(/\s+/g, ' ').split(' ');
    
            // Initialize an empty array to hold the updated data
            let updatedData = data.map(row => row.map(cell => ({ ...cell }))); // Create a deep copy of the data
    
            // Distribute words across cells
            let wordIndex = 0;
            for (let row = 0; row < updatedData.length; row++) {
                for (let col = 0; col < updatedData[row].length; col++) {
                    if (wordIndex < words.length) {
                        updatedData[row][col].value = words[wordIndex];
                        wordIndex++;
                    }
                }
            }
    
            // Update the state with the new data
            setData(updatedData);
        });
    };

    return (
        <div className={styles.uploadBlockcss}>
            <div className={styles.uploadHeader}>
                <h1>Upload image</h1>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div className={styles.previewblock}>
                <h1>Preview block</h1>
                {previewImage && <img src={previewImage} alt="Preview" />}
            </div>
            <div className={styles.transferdiv}>
                <button className={styles.transferbtn}>Transfer</button>
            </div>
            <div>
                <h2>Extracted Text:</h2>
                <p>{extractedText}</p>
            </div>

            <div className={styles.spreadSheetDiv}>
                <Spreadsheet data={data} />
            </div>
        </div>
    );
}

export default UploadBlock;