import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [selectfile, setSelectFie] = useState(null);
  console.log(selectfile);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    console.log(e.target.files);
    setSelectFie(e.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectfile) {
      toast.error("Please select a file!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectfile);
    try {
      const response = await axios.post(
        "http://localhost:3000/convertpdf",
        formData,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute(
        "download",
        selectfile.name.replace(/\.[^/.]+$/, "") + ".pdf"
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      toast.success("PDF downloaded successfully!");
      setSelectFie(null);
    } catch (error) {
      toast.error("Failed to convert! Try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40">
        <div className="flex h-screen items-center justify-center">
          <div
            className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-400 
           rounded-lg shadow-lg"
          >
            <h1 className="text-3xl font-bold text-center mb-4">
              Convert your word file in to pdf file
            </h1>
            <p className="text-sm text-center mb-5">
              Convert your WORD to PDF documents with incredible accuracy.{" "}
              <br />
              Select a word file to convert it into a PDF.👇🏻
            </p>

            <div className="flex flex-col items-center space-y-4">
              <input
                type="file"
                accept=".doc,.docx"
                name=""
                id="Fileinput"
                className="hidden"
                onChange={handleChange}
              />
              <label
                htmlFor="Fileinput"
                className=" flex items-center justify-center px-3 py-2 bg-gray-100
                 text-gray-700 rounded-lg shadow-lg cursor-pointer
                  border-blue-500 hover:bg-blue-700 duration-300  hover:text-white"
              >
                <CiCirclePlus className="text-3xl mr-3 " />
                <span className="text-xl ">
                  {selectfile ? selectfile.name : "Choose File"}
                </span>
              </label>
              <button
                onClick={handleSubmit}
                disabled={!selectfile || loading}
                className="text-white cursor-pointer bg-yellow-500  hover:bg-orange-500 duration-500 font-bold px-4 py-2 rounded-2xl disabled:bg-gray-400 disabled:pointer-events-none"
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Convert to PDF"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;