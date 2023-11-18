import React, { useEffect, useRef, useState } from "react";

// react-pintura
import { PinturaEditor } from "@pqina/react-pintura";

import {
  createDefaultFrameStyles,
  createDefaultLineEndStyles,
  createDefaultShapePreprocessor, createFrameStyleProcessor,
  createLineEndProcessor,
  createNode,
  getEditorDefaults,
  plugin_frame_defaults
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
        backgroundImage: '/frame.png',
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
  imageAnnotation: [
    {
      x: 0,
      y: 0,
      width: 200,
      height: 200,
      style: 'white',
    },
  ],

  // Set our custom shape preprocessor
  shapePreprocessor: createDefaultShapePreprocessor([
    // set default frame styles
    // createFrameStyleProcessor(createDefaultFrameStyles()),
  ]),

  imageWriter: {
    targetSize: {
      width: 578,
      height: 768,
    },

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
  const [imageSrc, setImageSrc] = useState(null);

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
  }, []);


  const handleProcess = (imageState) => {
    downloadFile(imageState.dest);
  }
  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    setImageSrc(file);
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
        backgroundImage: '/frame.png',
      // current style properties
      // frameColor: [1, 1, 1],
      disableStyle: ['strokeWidth', 'strokeColor'],
    };
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
            Upload image
          </label>
          <input id="file-upload" className="hidden" onChange={handleSelectImage} type="file" />
          {/*<button className="text-black bg-[#FFD742] text-[.75rem] font-semibold px-3 py-2 rounded-full" onClick={handleEditImage}>Edit</button>*/}
        </div>
        {/*<input type="file" className="bg-transparent "  onChange={handleSelectImage} name="Select image"/>*/}
        <PinturaEditor
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
          imageCropMaxSize={{width: 478, height:768}}


        cropMaskOpacity={0}
          imageAnnotation={[
          //   {
          //   x: 0,
          //   y: 0,
          //   width: '100%',
          //   height: '100%',
          //   backgroundImage: '/frame.png',
          //   alwaysOnTop:true,
          //   backgroundSize:'contain',
          //   disableTextLayout: ['true'],
          //   disableMove: true,
          //     disableReorder: true
          // },

          ]}
        />
      </div>
    </div>
  )
}
