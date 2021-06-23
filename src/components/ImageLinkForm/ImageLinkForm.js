import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({handleInputChange, handleImageSubmit}) => {

    return (
        <div>
            <p className='f4'>
                {'This app detects a human face in a picture! Paste in image url to find face.'}
            </p>
            <div className='center'>
                <div className='shadow-5 pa4 br3 form center'>
                    <input 
                        type='text' 
                        className='f4 pa2 w-70 center' 
                        onChange={handleInputChange}
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-pink'
                        type='submit'
                        onClick={handleImageSubmit}
                        >
                            Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;