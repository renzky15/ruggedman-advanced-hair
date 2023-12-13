import React, { useEffect, useRef, useState } from "react";
// react-pintura
import { PinturaEditor, PinturaEditorModal } from "@pqina/react-pintura";
import { SiBitwig } from "react-icons/si";

import {
  createDefaultFrameStyles,
  createDefaultLineEndStyles,
  createDefaultShapePreprocessor, createFrameStyleProcessor,
  createLineEndProcessor, createMarkupEditorOptionsControl, createMarkupEditorShapeStyleControls,
  createNode,
  getEditorDefaults,
  plugin_frame_defaults,
  appendEditor
} from "@pqina/pintura";
const { frameStyles } = plugin_frame_defaults;

// get default properties
const editorDefaults = getEditorDefaults({
  frameOptions: [
    // Custom 'myFrame'
    ['rugged', 'Rugged Frame'],
  ],

  // These are the styles available
  frameStyles: {
    id: 'rugged',
    // Our custom frame style
    rugged: {
      // The default shape styles for our frame
      shape: {
        frameStyle: 'rugged',
        backgroundImage: '/img/frame.png',
      },

    },
  },
  stickers: [
    {
      src: '/stickers/sticker1.png',
      width: 400,
      height: 400,
      alt: 'sticker-one',
    },
    {
      src: '/stickers/sticker2.png',
      width: 400,
      height: 400,
      alt: 'sticker-two',
    },
    {
      src: '/stickers/sticker3.png',
      width: 400,
      height: 400,
      alt: 'sticker-three',
    },
    {
      src: '/stickers/sticker4.png',
      width: 400,
      height: 400,
      alt: 'sticker-four',
    },
    {
      src: '/stickers/sticker5.png',
      width: 400,
      height: 400,
      alt: 'sticker-five',
    },
    {
      src: '/stickers/sticker6.png',
      width: 400,
      height: 400,
      alt: 'sticker-six',
    },
    {
      src: '/stickers/sticker7.png',
      width: 400,
      height: 400,
      alt: 'sticker-seven',
    },
    {
      src: '/stickers/sticker8.png',
      width: 400,
      height: 400,
      alt: 'sticker-eight',
    },
    {
      src: '/stickers/sticker9.png',
      width: 400,
      height: 400,
      alt: 'sticker-nine',
    },
    {
      src: '/stickers/sticker10.png',
      width: 400,
      height: 400,
      alt: 'sticker-ten',
    },
    {
      src: '/stickers/1.png',
      width: 400,
      height: 400,
      alt: 'sticker-12',
    },
    {
      src: '/stickers/2.png',
      width: 400,
      height: 400,
      alt: 'sticker-13',
    },
    {
      src: '/stickers/3.png',
      width: 400,
      height: 400,
      alt: 'sticker-14',
    },
    {
      src: '/stickers/4.png',
      width: 400,
      height: 400,
      alt: 'sticker-15',
    },
    {
      src: '/stickers/5.png',
      width: 400,
      height: 400,
      alt: 'sticker-16',
    },
    {
      src: '/stickers/6.png',
      width: 400,
      height: 400,
      alt: 'sticker-17',
    },
    {
      src: '/stickers/7.png',
      width: 400,
      height: 400,
      alt: 'sticker-18',
    },
    {
      src: '/stickers/8.png',
      width: 400,
      height: 400,
      alt: 'sticker-19',
    }
  ],

  // Set our custom shape preprocessor
  shapePreprocessor: createDefaultShapePreprocessor([
    // set default frame styles
    // createFrameStyleProcessor(createDefaultFrameStyles()),
  ]),

  imageWriter: {

    postprocessImageData: (imageData) =>
      new Promise((resolve, reject) => {
        // Create a canvas element to handle the imageData
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);

        // Draw our watermark on top
        const watermark = new Image();
        watermark.onload = () => {
          // how to draw the image to the canvas
          // ctx.globalCompositeOperation = 'screen';

          // draw the watermark in the top right corner
          ctx.drawImage(
            watermark,

            // the watermark x and y position
            100,
            100,

            // the watermark width and height
            500,
            500
          );

          // Get and return the modified imageData
          resolve(
            ctx.getImageData(
              0,
              0,
              imageData.width,
              imageData.height
            )
          );
        };
        watermark.onerror = reject;
        watermark.crossOrigin = 'Anonymous';
        watermark.src = '/img/watermark.svg';
      }),
  },

});

const modalEditorDefaults = getEditorDefaults({
  frameOptions: [
    // Custom 'myFrame'
    ['before', 'Before Frame'],
  ],
  imageWriter: {
    targetSize: {
      width: 256,
      height: 256,
      upscale: true,
      fit: 'cover',
    },
  },

  // These are the styles available
  frameStyles: {
    id: 'before',
    // Our custom frame style
    before: {
      // The default shape styles for our frame
      shape: {
        frameStyle: 'before',
        backgroundImage: '/img/beforeWhite.png',
      },

    },
  },
  stickers: [
    {
      src: '/stickers/sticker1.png',
      width: 400,
      height: 400,
      alt: 'sticker-one',
    },
    {
      src: '/stickers/sticker2.png',
      width: 400,
      height: 400,
      alt: 'sticker-two',
    },
    {
      src: '/stickers/sticker3.png',
      width: 400,
      height: 400,
      alt: 'sticker-three',
    },
    {
      src: '/stickers/sticker4.png',
      width: 400,
      height: 400,
      alt: 'sticker-four',
    },
    {
      src: '/stickers/sticker5.png',
      width: 400,
      height: 400,
      alt: 'sticker-five',
    },
    {
      src: '/stickers/sticker6.png',
      width: 400,
      height: 400,
      alt: 'sticker-six',
    },
    {
      src: '/stickers/sticker7.png',
      width: 400,
      height: 400,
      alt: 'sticker-seven',
    },
    {
      src: '/stickers/sticker8.png',
      width: 400,
      height: 400,
      alt: 'sticker-eight',
    },
    {
      src: '/stickers/sticker9.png',
      width: 400,
      height: 400,
      alt: 'sticker-nine',
    },
    {
      src: '/stickers/sticker10.png',
      width: 400,
      height: 400,
      alt: 'sticker-ten',
    },
    {
      src: '/stickers/1.png',
      width: 400,
      height: 400,
      alt: 'sticker-12',
    },
    {
      src: '/stickers/2.png',
      width: 400,
      height: 400,
      alt: 'sticker-13',
    },
    {
      src: '/stickers/3.png',
      width: 400,
      height: 400,
      alt: 'sticker-14',
    },
    {
      src: '/stickers/4.png',
      width: 400,
      height: 400,
      alt: 'sticker-15',
    },
    {
      src: '/stickers/5.png',
      width: 400,
      height: 400,
      alt: 'sticker-16',
    },
    {
      src: '/stickers/6.png',
      width: 400,
      height: 400,
      alt: 'sticker-17',
    },
    {
      src: '/stickers/7.png',
      width: 400,
      height: 400,
      alt: 'sticker-18',
    },
    {
      src: '/stickers/8.png',
      width: 400,
      height: 400,
      alt: 'sticker-19',
    }
  ],


});

const downloadFile = (file) => {
  // Create a hidden link and set the URL using createObjectURL
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = URL.createObjectURL(file);
  link.download = file.name;

  // We need to add the link to the DOM for "click()" to work
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait a short moment before clean up
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
}

const browse = (options) => {
  return new Promise((resolve) => {
    const element = document.createElement('input');
    element.type = 'file';
    element.accept = options.accept;
    element.onchange = () => {
      const [file] = element.files;
      if (!file) return resolve();
      resolve(file);
    };
    element.click();
  });
};

export default function ImageEditorComponent() {
  // inline result
  const editorRef = useRef(null);
  const editorModalRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [beforeSrc, setBeforeSrc] = useState(undefined);
  const [isBlank, setIsBlank] = useState(false);
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState("");
  const [fileName, setFileName] = useState("Upload image");

  useEffect(() => {
    const blankImage = document.createElement('canvas');
    blankImage.width = 578;
    blankImage.height = 768;



    // The default <canvas> is transparent, let's make it white
    const imageContext = blankImage.getContext('2d');
    imageContext.fillStyle = 'white';
    imageContext.fillRect(0, 0, blankImage.width, blankImage.height);

    // Set editor source to the canvas
    setImageSrc(blankImage);
    setIsBlank(true)
  }, []);



  const handleProcess = (imageState) => {
    downloadFile(imageState.dest);
  }
  const handleSelectImage = (event) => {
      const file = event.target.files[0];
      setImageSrc(file);
      setFileName("Change image");
      setIsBlank(false);

    // editorRef.current.editor
    //   .loadImage(file)
    //   .then((imageReaderResult) => {
    //     // Logs loaded image data
    //     console.log(imageReaderResult);
    //
    //   });

  }
  const handleSelectBeforeImage = (event) => {
    const file = event.target.files[0];
    setBeforeSrc(file);
    setFileName("Change image");
    setIsBlank(false);
    setVisible(true)
    // editorRef.current.editor
    //   .loadImage(file)
    //   .then((imageReaderResult) => {
    //     // Logs loaded image data
    //     console.log(imageReaderResult);
    //
    //   });

  }
  const handleEditorUpdateshape = (shape) => {
    console.log('updateshape', shape);
  };
  const beforeUpdateShape = (shape, props, context) => {
    console.log('beforeUpdateShape', shape, props, context);
    return props;
  };


  const handleLoadImage = (img) => {
    editorRef.current.editor.imageFrame = {
      // the key of the frame in the menu
      id: 'rugged',
        // the style of the frame
        frameStyle: 'rugged',
        backgroundImage: '/img/frame.png',
      // current style properties
      // frameColor: [1, 1, 1],
      disableStyle: ['strokeWidth', 'strokeColor'],
    };

  }

  const handleModalLoadImage = (img) => {
    editorModalRef.current.editor.imageFrame = {
      // the key of the frame in the menu
      id: 'before',
      // the style of the frame
      frameStyle: 'before',
      backgroundImage: '/img/beforeWhite.png',
      // current style properties
      // frameColor: [1, 1, 1],
      disableStyle: ['strokeWidth', 'strokeColor'],
    };
  }

  // const handleOnLoadModal = () => {
    // editorModalRef.current.editor.imageFrame = {
    //   // the key of the frame in the menu
    //   id: 'rugged',
    //   // the style of the frame
    //   frameStyle: 'rugged',
    //   backgroundImage: '/before.png',
    //   // current style properties
    //   // frameColor: [1, 1, 1],
    //   disableStyle: ['strokeWidth', 'strokeColor'],
    // };
  // }

  const handleModalDoneProcess = (dest) => {
    const result = URL.createObjectURL(dest);
    setResult(result);
  }



  const willRenderShapeControls = (controls, selectedShapeId) => {
    controls[0][3].push(
      // Add a "Select image" button
      createNode('Button', 'my-button', {
        label: 'Select image',
        onclick: async () => {
          // Find the currently selected shape
          const annotations =
            editorRef.current.editor.imageAnnotation;
          const shape = annotations.find(
            (shape) => shape.id === selectedShapeId
          );

          // browse for an image
          const file = await browse({
            accept: 'image/*',
          });

          // no file selected
          if (!file) return;

          // update background image
          shape.backgroundImage = URL.createObjectURL(file);

          // redraw annotations
          editorRef.current.editor.imageAnnotation = annotations;
        },
      })
    );
    return controls;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ height: '100vh', width: '100%' }}>
        <div className="text-black absolute right-20 top-3 z-10">
          <label htmlFor="file-upload" className="text-black bg-[#FFD742] text-[.75rem] font-semibold px-3 py-2 rounded-full">
            {fileName}
          </label>
          <input id="file-upload" className="hidden" onChange={handleSelectImage} type="file" />
          {/*<button className="text-black bg-[#FFD742] text-[.75rem] font-semibold px-3 py-2 rounded-full" onClick={handleEditImage}>Edit</button>*/}
        </div>
        <div className={`absolute left-9 top-14 z-10 text-black  text-[.75rem] font-semibold px-3 py-2 rounded-full bg-[#FFD742]`}>
            <label htmlFor="file-uploadBefore" className="text-black bg-[#FFD742] text-[.75rem] font-semibold px-3 py-2 rounded-full">
              Choose before image
            </label>
            <input id="file-uploadBefore" className="hidden" onChange={handleSelectBeforeImage} type="file" />
            {/*<button className="text-black bg-[#FFD742] text-[.75rem] font-semibold px-3 py-2 rounded-full" onClick={handleEditImage}>Edit</button>*/}
          </div>
        <button className={`absolute left-20 top-3 z-10 text-black  text-[.75rem] font-semibold px-3 py-2 rounded-full ${isBlank  ? 'bg-[#c8cacc] border border-[#ccc]': 'bg-[#FFD742]'}`} disabled={isBlank} onClick={() => setVisible(true)}>Edit before image</button>



        <button className={`absolute left-56 top-3 z-10 text-black  text-[.75rem] font-semibold px-3 py-2 rounded-full ${isBlank  ? 'bg-[#c8cacc] border border-[#ccc]': 'bg-red-600 text-white'}`} disabled={isBlank} onClick={() => setResult(URL.createObjectURL(new File([], "blank",{type: "image/jpeg"})))}>Delete</button>
        {/*<input type="file" className="bg-transparent "  onChange={handleSelectImage} name="Select image"/>*/}
        {!visible && <PinturaEditor
          {...editorDefaults}
          ref={editorRef}
          src={imageSrc}
          utils={[
            'annotate',
            'decorate',
            'sticker',
            'frame',
            'crop'
          ]}
          onLoad={(res) => handleLoadImage(res)}
          onUpdateshape={handleEditorUpdateshape}
          // onSelectshape={handleEditorSelectshape}
          // beforeUpdateShape={beforeUpdateShape}
          willRenderShapeControls={willRenderShapeControls}
          onProcess={handleProcess}
          imageCropAspectRatio={12 / 16}

          cropMaskOpacity={0}
        //   imageAnnotation={[{
        //     backgroundColor:[1,1,1, 0],
        //   backgroundImage: result,
        //   cornerRadius: 0,
        //   disableErase: true,
        //   flipX: false,
        //   flipY: false,
        //   height: "20%",
        //   isEditing: false,
        //   isSelected: false,
        //   opacity: 1,
        //   rotation: -0.1651854044405765,
        //   width: "20%",
        //   x: "9.926836229103863%",
        //   y: "59.78706621106059%",
        //   _isDraft: false,
        //   _isFormatted: true,
        //   _prerender: false
        // }]}
        />}

        {!!result.length && (
          <p className={'absolute bottom-[320px] left-[190px] w-24 h-16 custom-rotate'}>
            <img src={result} alt="" />
          </p>
        )}

        {visible && (
            <PinturaEditorModal
              {...modalEditorDefaults}
              utils={[
                'annotate',
                'decorate',
                'sticker',
                'frame',
                'crop'
              ]}
              src={beforeSrc}
              ref={editorModalRef}
              onLoad={handleModalLoadImage}
              onHide={() => setVisible(false)}
              onProcess={({ dest }) => handleModalDoneProcess(dest)}
              imageCropAspectRatio={12/ 16}
              cropMaskOpacity={0}

            />
        )}

        <button className={`absolute right-[302px] focus:bg-[#C3C3C3] bg-white  pointer-events-none bottom-3 border border-[#ECECEC] rounded-xl text-[12px] px-[18px] pb-2 pt-[17px] flex flex-col items-center justify-bottom gap-2`}><SiBitwig className={`text-[12px]`} />Rugs</button>
      </div>
    </div>
  )
}
