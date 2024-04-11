"use client";

// CONVERT IMAGES TO PNG, WORD CANT READ BASE64
// CHECK BLOBPROVIDER FROM react-pdf (see what's inside)

import { useState, useEffect, useRef } from "react";

import Compressor from "compressorjs";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { HiClipboardCopy } from "react-icons/hi";

import { Icon } from "@iconify/react/dist/iconify.js";
import { ConstatareSorin } from "@/components/GeneratorPDF";
import { PDFViewer } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { useWindowSize } from "@/hooks/useWindowSize";

import { FaFilePdf } from "react-icons/fa6";
import Tiptap from "./TipTap";

export default function MainComponent() {
  const [images, setImages] = useState<any>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showFisa, setShowFisa] = useState<boolean>(false);
  const [showRaport, setShowRaport] = useState<boolean>(false);
  const [readyToRequest, setReadyToRequest] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    denumire_lucrare: "",
    numar_fisa: "",
    randuri: 10,
    pasi: [],
    detalii: "",
    aria: "",
    zona: "",
    locatie_specifica: "",
    executant: "Nitu Sorin Razvan",
    data: "",
    tip_activitate: "Constatare MCA",
    reprezentant_anb: "Anton Ciometti",
    status: null,
  });

  const windowSize = useWindowSize();
  const fileInputRef = useRef<any>(null);

  const industrialeData = {
    denumire_lucrare: formData.denumire_lucrare,
    aria: formData.aria,
    zona: formData.zona,
    tip_activitate: formData.tip_activitate,
    locaite_specifica: formData.locatie_specifica,
    status: formData.status,
    executant: formData.executant,
    reprezentant_anb: formData.reprezentant_anb,
    data: formData.data,
    numar_fisa: formData.numar_fisa,
    detalii: formData.detalii.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), // Diacritics
  };

  // PDF DOWNLOAD LINK FIX

  const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    {
      ssr: false,
      loading: () => (
        <p className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-400">
          Loading...
        </p>
      ),
    }
  );
  // End of fix

  const handleResetareForumlar = () => {
    setFormData({
      denumire_lucrare: "",
      numar_fisa: "",
      randuri: 10,
      pasi: [],
      detalii: "",
      aria: "",
      zona: "",
      locatie_specifica: "",
      executant: "",
      data: "",
      tip_activitate: null,
      reprezentant_anb: "",
      status: null,
    });
  };

  const handleValidation = () => {
    if (
      formData.denumire_lucrare.length > 0 &&
      formData.pasi.length > 0 &&
      formData.executant.length > 0 &&
      formData.data.length > 0 &&
      formData.aria.length > 0 &&
      formData.zona.length > 0
    ) {
      setReadyToRequest(true);
    } else setReadyToRequest(false);
  };

  const updateForm = (e: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // astazi stiu eu si Dumnezeu ce e aici.
  // maine doar Dumnezeu

  // GOOD WORKING FUNCTION

  function onFileSelect(e: any) {
    const files = e.target.files;
    if (files.length == 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e: any) => e.name === files[i].name)) {
        new Compressor(files[i], {
          quality: 0.8,
          success: (result: any) => {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onload = () => {
              // console.log("console log fain: " + reader.result);
              setImages((prevImages: any) => [
                ...prevImages,
                {
                  name: files[i].name,
                  url: reader.result,
                },
              ]);
            };
          },
        });
      }
    }
  }

  // only png works (current one im using)

  // function onFileSelect(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       new Compressor(files[i], {
  //         quality: 0.8,
  //         convertTypes: ["image/jpeg"],
  //         success: (result: any) => {
  //           const reader = new FileReader();
  //           const mustBePng = new Blob([result], { type: "image/png" });
  //           reader.readAsDataURL(mustBePng);
  //           reader.onload = () => {
  //             setImages((prevImages: any) => [
  //               ...prevImages,
  //               {
  //                 type: result.type,
  //                 name: files[i].name,
  //                 url: reader.result,
  //               },
  //             ]);
  //           };
  //         },
  //       });
  //     }
  //   }
  // }

  // No compression File Select Function

  // function onFileSelect_noCompressor(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       const reader = new FileReader();
  //       const mustBePng = new Blob([files[i]], { type: "image/png " });
  //       reader.readAsDataURL(mustBePng);
  //       reader.onload = () => {
  //         setImages((prevImages: any) => [
  //           ...prevImages,
  //           {
  //             name: files[i].name,
  //             url: reader.result,
  //           },
  //         ]);
  //       };
  //     }
  //   }
  // }

  // 21.03.2024 try (CURRENT ONE IN USE)

  // function onFileSelect(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(files[i]);
  //       reader.onload = () => {
  //         setImages((prevImages: any) => [
  //           ...prevImages,
  //           {
  //             type: files[i].type,
  //             name: files[i].name,
  //             url: URL.createObjectURL(files[i]),
  //           },
  //         ]);
  //       };
  //     }
  //   }
  // }

  // async function convertType(source: any, type: any) {
  //   let image = await createImageBitmap(source);
  //   let canvas = new OffscreenCanvas(image.width, image.height);
  //   let context = canvas.getContext("2d");
  //   context?.drawImage(image, 0, 0);

  //   let result = await canvas.convertToBlob({ type });
  //   image.close();
  //   return result;
  // }

  // // another try i guess

  // // console.log(images);

  // async function onFileSelect(e: any) {
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       const convertedImage = await convertType(files[i], "image/png");
  //       console.log("thing: ", convertedImage);
  //       if (convertedImage)
  //         setImages((prevImages: any) => [
  //           ...prevImages,
  //           {
  //             type: files[i].type,
  //             name: files[i].name,
  //             url: URL.createObjectURL(convertedImage),
  //           },
  //         ]);
  //     }
  //   }
  // }

  function deleteImage(fileIndex: number) {
    setImages((prevImages: any) => {
      return prevImages.filter((_: any, i: any) => i !== fileIndex);
    });
  }

  function onDragOver(e: any) {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(e: any) {
    e.preventDefault();
    setIsDragging(false);
  }

  // Old Drop function (only png but not showing)

  function onDrop(e: any) {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e: any) => e.name === files[i].name)) {
        new Compressor(files[i], {
          quality: 0.8,
          success: (result: any) => {
            const reader = new FileReader();
            console.log(reader);
            reader.readAsDataURL(result);
            reader.onload = () => {
              // console.log("console log fain: " + reader.result);
              setImages((prevImages: any) => [
                ...prevImages,
                {
                  name: files[i].name,
                  url: reader.result,
                },
              ]);
            };
          },
        });
      }
    }
  }

  const handleContentChange = (newContent: any) => {
    const descriere1 = newContent.slice(3);
    const descriere2 = descriere1.slice(0, -4);
    const descriere3 = descriere2.replace(/\r?\n|\r/g, "");
    setFormData((prevState: any) => ({
      ...prevState,
      detalii: descriere3,
    }));
  };

  // new ondrop only png works
  // doesnt work well

  // function onDrop(e: any) {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const files = e.target.files;
  //   if (files.length == 0) return;
  //   for (let i = 0; i < files.length; i++) {
  //     if (files[i].type.split("/")[0] !== "image") continue;
  //     if (!images.some((e: any) => e.name === files[i].name)) {
  //       new Compressor(files[i], {
  //         quality: 0.8,
  //         success: (result: any) => {
  //           const reader = new FileReader();
  //           reader.readAsDataURL(result);
  //           reader.onload = () => {
  //             // console.log("console log fain: " + reader.result);
  //             setImages((prevImages: any) => [
  //               ...prevImages,
  //               {
  //                 name: files[i].name,
  //                 url: reader.result,
  //               },
  //             ]);
  //           };
  //         },
  //       });
  //     }
  //   }
  // }

  function selectFiles() {
    fileInputRef.current.click();
  }

  // console.log("descriere: "  + descriere) // Check Descriere

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <main className="flex min-h-screen items-center flex-col ">
      <div className="flex w-full bg-white flex-col p-10 rounded-lg">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col">
            <h1 className="font-bold  2xl:text-xl text-sm">Constatari Sorin</h1>
            <h1 className="font-regular  text-sm text-gray-500">
              Generator Constatari
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-gray-300 disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
              onClick={handleResetareForumlar}
            >
              Resetare
            </button>
            <button
              type="button"
              className="bg-gray-300 xl:flex hidden disabled:bg-gray-500 disabled:hover:text-black mt-4 p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
              onClick={() => {
                setShowFisa(false), setShowRaport(false);
              }}
            >
              Close Previews
            </button>
          </div>
        </div>

        <hr className="w-full border-gray-500 mt-4" />

        <div className="w-full gap-10 flex 2xl:flex-row flex-col">
          <div className="flex flex-col 2xl:w-1/2 w-full h-full mt-[2rem]">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="denumire_lucrare"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Titlu Constatare</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="denumire_lucrare"
                  type="text"
                  name="denumire_lucrare"
                  value={formData.denumire_lucrare}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Title Lucrare"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>
              <div>
                <label
                  htmlFor="denumire_lucrare"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Titlu Constatare</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <select
                  id="tip_activitate"
                  name="tip_activitate"
                  value={formData.tip_activitate}
                  onChange={(e: any) => updateForm(e)}
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                >
                  <option
                    value="Constatare MCA
"
                  >
                    Constatare MCA
                  </option>
                  <option
                    value="Constatare DPA
"
                  >
                    Constatare DPA
                  </option>
                  <option
                    value="Constatare Tichet
"
                  >
                    Constatare Tichet{" "}
                  </option>
                </select>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="executant"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Executant Constatare</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <select
                  id="executant"
                  name="executant"
                  value={formData.executant}
                  onChange={(e: any) => updateForm(e)}
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                >
                  <option
                    value="Nitu Sorin Razvan
"
                  >
                    Nitu Sorin Razvan
                  </option>
                  <option
                    value="Aurel Dumitrescu
"
                  >
                    Aurel Dumitrescu{" "}
                  </option>
                </select>
              </div>
              {/* 
              <div className="mt-4">
                <label
                  htmlFor="reprezentant_anb"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Reprezentant ANB</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="reprezentant_anb"
                  type="text"
                  name="reprezentant_anb"
                  value={formData.reprezentant_anb}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Reprezentant ANB"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div> */}
              {/* Numar Fisa (aparent nu mai este nevoie de el asa ca il comentez)
              <div className="mt-4">
                <label
                  htmlFor="numar_fisa"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Numar Fisa</p>
                  </div>
                </label>
                <input
                  id="numar_fisa"
                  type="text"
                  name="numar_fisa"
                  value={formData.numar_fisa}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Numar Fisa"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full"
                />
              </div> */}
              <div className="mt-4">
                <label htmlFor="data" className="text-gray-500 mb-2 font-bold ">
                  <div className="flex justify-between">
                    <p>Data</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="data"
                  type="text"
                  name="data"
                  value={formData.data}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Data"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>
              {/* <div className="mt-4">
                <label htmlFor="aria" className="text-gray-500 mb-2 font-bold ">
                  <div className="flex justify-between">
                    <p>Aria</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="aria"
                  type="text"
                  name="aria"
                  value={formData.aria}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Aria"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div> */}
              <div className="mt-4">
                <label htmlFor="zona" className="text-gray-500 mb-2 font-bold ">
                  <div className="flex justify-between">
                    <p>Zona</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="zona"
                  type="text"
                  name="zona"
                  value={formData.zona}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Zona"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div>
              {/* 
                TIP ACTIVITATE

              <div className="mt-4 gap-2">
                <div className="flex justify-between">
                  <p className=" text-gray-500 mb-2 font-bold ">
                    Tip Activitate
                  </p>
                  <span className="text-green-500 font-bold text-sm"> * </span>
                </div>

                <div className="flex jutsify-start items-center gap-2">
                  <div className="RADIO_INPUT flex">
                    <input
                      id="corectiv"
                      type="radio"
                      value="Corectiv"
                      name="tip_activitate"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm focus:outline-green-600 p-2"
                    />
                    <label htmlFor="corectiv" className="ml-1 ">
                      Corectiv
                    </label>
                  </div>
                  <div className="RADIO_INPUT flex ml-[2.75rem]">
                    <input
                      id="preventiv"
                      type="radio"
                      value="Preventiv"
                      name="tip_activitate"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                    />
                    <label htmlFor="preventiv" className="ml-1">
                      Preventiv
                    </label>
                  </div>
                </div>
              </div> */}
              {/*
                LUCRARE FINALIZATA

              <div className="mt-4 gap-2">
                <div className="flex justify-between">
                  <p className=" text-gray-500 mb-2 font-bold ">
                    Lucrare Finalizata
                  </p>
                  <span className="text-green-500 font-bold text-sm"> * </span>
                </div>

                <div className="flex jutsify-start items-center gap-2">
                  <div className="RADIO_INPUT flex">
                    <input
                      id="nefinalizat"
                      type="radio"
                      value="NU"
                      name="status"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                    />
                    <label htmlFor="nefinalizat" className="ml-2">
                      NU
                    </label>
                  </div>
                  <div className="RADIO_INPUT flex ml-6">
                    <input
                      id="finalizat"
                      type="radio"
                      value="DA"
                      name="status"
                      onChange={(e: any) => updateForm(e)}
                      className="rounded-sm bg-gray-100 focus:outline-green-600 p-2"
                    />
                    <label htmlFor="finalizat" className="ml-1">
                      DA
                    </label>
                  </div>
                </div>
              </div> */}
              {/* 
                // DESCRIERE
              <div className="mt-4">
                <label
                  htmlFor="randuri"
                  className="text-gray-500 mb-2 font-bold "
                >
                  <div className="flex justify-between">
                    <p>Randuri Descriere</p>
                    <span className="text-green-500 font-bold text-sm">
                      {" "}
                      *{" "}
                    </span>
                  </div>
                </label>
                <input
                  id="randuri"
                  type="number"
                  name="randuri"
                  value={formData.randuri}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Prestabilit 10 Randuri"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 p-2 w-full "
                />
              </div> */}

              {/* Detalii Descriere, i guess still nothing. */}

              <div className="mt-4">
                <label
                  htmlFor="detalii"
                  className="text-gray-500 mb-2 font-bold "
                >
                  Detalii Constatare
                </label>
                <textarea
                  id="detalii"
                  name="detalii"
                  value={formData.detalii}
                  onChange={(e: any) => updateForm(e)}
                  placeholder="Detalii Constatare"
                  className="rounded-sm bg-gray-100 focus:outline-green-600 pl-2 pt-2 w-full h-[10rem]"
                />
              </div>
              {/* <p className="text-gray-500 mb-1 font-bold mt-[1rem] ">
                Detalii Constatare
              </p>
              <Tiptap
                content={formData.detalii}
                onChange={(newContent: string) =>
                  handleContentChange(newContent)
                }
              /> */}
            </form>
            {/* DRAG AND DROP HERE */}

            <div className="CARD mt-4 overflow-hidden">
              <div className="flex justify-between items-center mb-2 ">
                <h1 className="font-bold text-gray-500">Imagini Constatare </h1>
                <button
                  type="button"
                  className="bg-gray-300 flex disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                  onClick={() => {
                    setImages([]);
                  }}
                >
                  Sterge Poze
                </button>
              </div>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className="DRAG_AREA select-none w-full gap-2 h-[10rem] flex-col flex items-center justify-center border-dashed border-4 border-green-700 bg-gray-100"
              >
                {isDragging ? (
                  <></>
                ) : (
                  <>
                    <span className="select-none ml-2">
                      Image Upload (Drop)
                    </span>
                    <button
                      onClick={selectFiles}
                      className="select-none cursor-pointer bg-gray-300 p-1 rounded-lg text-black hover:bg-green-700 hover:text-white transition-all duration-100"
                    >
                      Browse
                    </button>
                  </>
                )}
                <input
                  type="file"
                  name="file"
                  className="FILE hidden"
                  multiple
                  ref={fileInputRef}
                  onChange={onFileSelect}
                />
              </div>

              <div className="container relative overflow-y-scroll w-full h-auto flex justify-start items-start flex-wrap max-h-[200px] mt-[10px] gap-4 mb-2">
                {images.map((image: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="image lg:w-[160px] lg:h-[160px] w-[120px] h-[120px] shadow-lg relative"
                    >
                      <span
                        onClick={() => deleteImage(index)}
                        className="delete z-10 absolute w-8 h-8 cursor-pointer top-2 right-2 text-xl bg-white shadow-md flex justify-center items-center rounded-full hover:bg-red-500 transition-all duration-100"
                      >
                        <MdDeleteForever />
                      </span>
                      <img
                        src={image.url}
                        alt={image.name}
                        draggable={false}
                        className="w-full select-none h-full rounded-lg"
                      />
                      {image.type === "image/png" ? (
                        <>
                          <div className="absolute top-2 bg-green-700 text-white font-bold rounded-lg flex gap-1 items-center justify-center shadow uppercase left-2 p-1">
                            PNG <FaRegCheckCircle />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="absolute top-2 bg-red-600 text-white flex justify-center items-center gap-1 font-bold rounded-lg shadow uppercase left-2 p-1">
                            JPG <IoMdCloseCircleOutline />
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="2xl:w-1/2 w-full h-full mt-[2rem] flex flex-col">
            <div className="rezultat flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-center w-full h-auto"></div>

              <div className="flex w-full items-center justify-center gap-2">
                <PDFDownloadLink
                  document={
                    <ConstatareSorin data={industrialeData} imagini={images} />
                  }
                  className="w-full"
                  fileName={`CONSTATARE - ${industrialeData.data} - ${industrialeData.denumire_lucrare}, ${industrialeData.zona}`.replaceAll(
                    ".",
                    "/"
                  )}
                >
                  {({ loading, error }) =>
                    loading ? (
                      <button
                        type="button"
                        className="bg-gray-300 w-full flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                      >
                        <FaFilePdf /> Loading File
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-gray-300 w-full flex gap-2 items-center justify-center disabled:bg-gray-500 disabled:hover:text-black p-2 hover:bg-red-800 text-black duration-100 hover:text-white rounded-xl"
                      >
                        <FaFilePdf /> Download PDF
                      </button>
                    )
                  }
                </PDFDownloadLink>
              </div>

              {/* PDF VIEWER */}
              <div className="md:flex hidden gap-2 w-full">
                <button
                  onClick={() => {
                    setShowFisa(true), setShowRaport(false);
                  }}
                  className="bg-gray-300 xl:flex hidden items-center rounded-lg gap-2 w-full justify-center disabled:bg-gray-500 disabled:hover:text-black hover:bg-green-700 hover:text-white duration-100 transition-all p-2"
                >
                  <Icon icon="solar:document-linear" width="24" height="24" />{" "}
                  Toggle Constatare
                </button>
              </div>
              {showFisa === true ? (
                <>
                  <h1 className="font-bold text-gray-500 mt-5">
                    Constatare (Preview)
                  </h1>
                  <div className="w-full h-[60rem] md:block hidden bg-zinc-500">
                    <PDFViewer height="100%" width="100%" showToolbar={true}>
                      <ConstatareSorin
                        data={industrialeData}
                        imagini={images}
                      />
                    </PDFViewer>
                  </div>
                </>
              ) : (
                ""
              )}

              {/* PDF VIEWER END */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
