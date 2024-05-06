import React, { useState } from 'react'
import md5 from 'md5'

export default function TextForm(props) {

    const readTxt = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            setText(event.target.result);
        };
        reader.readAsText(file);

    }
    const DownloadText = () => {
        let fileName = "converted.txt";
        DownLoadFile(fileName, text);
    };
    function DownLoadFile(filename, NewText) {
        const element = document.createElement("a");

        
        const blob = new Blob([NewText], { type: "plain/text" });

        const fileUrl = URL.createObjectURL(blob);

        element.setAttribute("href", fileUrl);
        element.setAttribute("download", filename); 
        element.style.display = "none";

        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
        props.showAlert("File Downloaded Successfully!", "success");

    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }


    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to lowercase!", "success");
    }

    const handlemd5 = () => {
        let newText = md5(text);
        setText(newText)
        props.showAlert("Calculate MD5!", "success");
    }
    const capitalize = () => {
        let CapitalizeWords = text[0].toUpperCase();
        for (let i = 1; i <= text.length - 1; i++) {
            let currentCharacter, previousCharacter = text[i - 1];
            if (previousCharacter && previousCharacter === ' ') {
                currentCharacter = text[i].toUpperCase();
            } else {
                currentCharacter = text[i];
            }
            CapitalizeWords = CapitalizeWords + currentCharacter;
        }
        setText(CapitalizeWords);
        props.showAlert("Converted to Capital Case!", "success");

    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    }

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    const [text, setText] = useState('');
    return (
        <>
            <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1 className='mb-4'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="myBox" rows="8"></textarea>
                    <input type="file" className="btn btn-secondary my-2" accept="text/plain" onChange={readTxt} />

                    <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={DownloadText}>Download File</button>
                </div>
                <div>
                    <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={speak}>Listen</button>
                    <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                    <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                    <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={capitalize}>Convert to Capital Case</button>
                    <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handlemd5}>Calculate MD5</button>
                </div>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            </div>
            <div className="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    )
}