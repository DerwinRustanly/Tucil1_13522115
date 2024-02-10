import { ReactTyped } from "react-typed";
import { useState, useEffect, useRef } from "react";
import Loading from "../components/loading";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [reward, setReward] = useState(null);
  const [duration, setDuration] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [resultBarOpen, setResultBarOpen] = useState(false);
  const [sequences, setSequences] = useState(null);
  const [saveBarOpen, setSaveBarOpen] = useState(false);
  const [saveFilename, setSaveFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isCompleted, setCompleted] = useState(false)
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    if (file) {
      setUploadedFileName(file.name);
    } else {
      setUploadedFileName("No File Uploaded");
    }
  };

  useEffect(() => {
    if (file) {
      setUploadedFileName(file.name);
      fileInputRef.current.value = "";
    } else {
      setUploadedFileName("No File Uploaded");
    }
  }, [file, uploadedFileName]);

  useEffect(() => {
    console.log("sequences: ");
    console.log(sequences);
    console.log("width: ");
    console.log(width);
    console.log("height: ");
    console.log(height);
    console.log("matrix: ");
    console.log(matrix);
    console.log("buffer: ");
    console.log(buffer);
    console.log("reward: ");
    console.log(reward);
    console.log("coordinates: ");
    console.log(coordinates);
    console.log("durations: ");
    console.log(duration);
  }, [matrix, buffer, reward, coordinates, duration, height, width, sequences]);

  const handleUpload = async () => {
    try {
      setResultBarOpen(false);
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setSequences(data.sequences);
      setWidth(data.width);
      setHeight(data.height);
      setMatrix(data.matrix);
      setBuffer(data.maxbuffer);
      setCoordinates(data.maxcoordinate);
      setReward(data.maxvalue);
      setDuration(data.duration.toFixed(2));
      setResultBarOpen(true);
      setLoading(false);
      setCompleted(true)
      setTimeout(()=>setCompleted(false), 5000)
      // Handle successful upload
    } catch (error) {
      // Handle error
    }
  };

  const handleSave = async (filename) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename,
          reward,
          buffer,
          coordinates,
          duration,
        }),
      });

      if (response.ok) {
        console.log("File Saved Succesfully");
        setSaveBarOpen(false);
        setResultBarOpen(false);
        setFile(null);
        setUploadedFileName("");
        setSaveFile("");
        setLoading(false);
        setCompleted(true)
        setTimeout(()=>setCompleted(false), 5000)
      }
    } catch (error) {}
  };

  return (
    <div className="w-full flex flex-col font-primary text-baseYellow justify-center items-center min-h-screen">
      <div className="flex p-4 mt-24">
        <ReactTyped
          className="text-3xl w-[500px] p-12 font-bold uppercase z-10"
          strings={["Please Upload a Txt File with the Following Format:"]}
          typeSpeed={40}
        ></ReactTyped>
        <div className="border-baseYellow w-full border-4 bg-zinc-900 rounded-lg font-semibold text-lg">
          <div className="bg-baseYellow w-full text-black px-4 py-2 font-bold">
            File.txt
          </div>
          <p className="bg-zinc-900 p-4">
            buffer_size
            <br />
            matrix_width matrix_height
            <br />
            matrix
            <br />
            number_of_sequences
            <br />
            sequences_1
            <br />
            sequences_1_reward
            <br />
            sequences_2
            <br />
            sequences_2_reward
            <br />
            …<br />
            sequences_n
            <br />
            sequences_n_reward
            <br />
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center w-full">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-[50%] h-64 border-2 border-baseYellow border-dashed rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800 "
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-baseYellow"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-baseYellow">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-baseYellow">Please Upload a TXT File</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt"
          />
          {uploadedFileName && (
            <p className="text-baseYellow">
              <span className="font-semibold">Uploaded file:</span>{" "}
              {uploadedFileName}
            </p>
          )}
        </label>
      </div>

      <button
        onClick={handleUpload}
        className="font-semibold text-xl mt-4 py-4 px-6 border-2 bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow hover:bg-[length:100%]  hover:text-black hover:border-black border-baseYellow rounded-2xl hover:scale-105 transition-all ease-in-out duration-500"
      >
        Solve
      </button>
      {resultBarOpen && (
        <div className="mt-24 justify-around border-t-2 border-t-baseYellow flex w-full p-12">
          <div className="border-2 border-baseYellow bg-zinc-900 rounded-lg p-8">
            <h1 className="text-2xl font-bold px-4 py-2">Results Info</h1>
            <p className="font-bold text-lg px-4 py-2">Sequences: </p>
            <div className="flex-col px-4 py-2">
              {sequences.map((sequence, i) => {
                return (
                  <div className="flex py-2" key={i}>
                    {sequence[0].map((seqtoken, j) => {
                      return (
                        <div
                          className="p-2 mx-2 flex w-12 h-12 items-center justify-center border rounded-lg border-dashed border-baseYellow"
                          key={j}
                        >
                          {seqtoken}
                        </div>
                      );
                    })}
                    <p className="px-4 py-2 text-lg">
                      <span className="font-bold">Reward:</span> {sequence[1]}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="px-4 py-2 text-lg">
              <span className="font-bold">Optimal Reward:</span> {reward}
            </p>
            <p className="font-bold text-lg px-4 py-2">Buffer: </p>
            <div className="flex px-4 py-2">
              {buffer.map((token, index) => (
                <div
                  className="p-2 mx-2 flex w-12 h-12 items-center justify-center border rounded-lg border-dashed border-baseYellow"
                  key={index}
                >
                  {token}
                </div>
              ))}
            </div>
            <p className="font-bold text-lg px-4 py-2">Coordinates: </p>
            <div className="px-4 py-2 flex font-semibold">
              {coordinates.map((coordinate, index) => (
                <div className="p-2" key={index}>
                  {`${index + 1}. (${coordinate[1] + 1},${coordinate[0] + 1})`}
                </div>
              ))}
            </div>
            <p>
              <span className="px-4 py-2 font-bold">Duration:</span> {duration}{" "}
              ms
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setSaveBarOpen(true)}
                className="font-semibold text-lg mt-4 py-4 px-6 border-2 bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow hover:bg-[length:100%]  hover:text-black hover:border-black border-baseYellow rounded-2xl hover:scale-105 transition-all ease-in-out duration-500"
              >
                Save Result
              </button>
            </div>
          </div>
          <div className={`grid grid-rows-${height} gap-4`}>
            {matrix.map((row, i) => (
              <div key={i} className="flex gap-4">
                {row.map((token, j) => {
                  const isActive = coordinates.some(
                    (coord) => coord[0] === i && coord[1] === j
                  );
                  const activeCoordinateIndex = coordinates.findIndex(
                    (coord) => coord[0] === i && coord[1] === j
                  );
                  return (
                    <div
                      key={`${i}-${j}`}
                      className={`relative p-2 flex w-12 h-12 justify-center items-center border rounded-lg border-dashed border-baseYellow ${
                        isActive ? "border-solid border-2 font-bold" : ""
                      }`}
                    >
                      {token}
                      {isActive && (
                        <span className="absolute rounded-tl-md top-0 left-0 bg-baseYellow text-black text-xs  font-bold px-1">
                          {activeCoordinateIndex + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <!-- Modal toggle --> */}

      {/* <!-- Main modal --> */}
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        class={`${
          saveBarOpen ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow dark:bg-zinc-900 border-baseYellow border-2">
            {/* <!-- Modal header --> */}
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-baseYellow">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-baseYellow">
                Save Your Results
              </h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  setSaveBarOpen(false);
                }}
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div class="p-4 md:p-5">
              <form class="space-y-4" action="#">
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-baseYellow">
                    Your File Output
                  </label>
                  <input
                    class="text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 focus:outline-baseYellow dark:placeholder-gray-400 dark:text-white"
                    placeholder="output.txt"
                    required
                    value={saveFilename}
                    onChange={(e) => {
                      setSaveFile(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    class="font-semibold text-lg mt-4 py-4 px-6 border-2 bg-no-repeat bg-left bg-[length:0%] bg-gradient-to-r from-yellow-200 to-baseYellow hover:bg-[length:100%]  hover:text-black hover:border-black border-baseYellow rounded-2xl hover:scale-105 transition-all ease-in-out duration-500"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSave(saveFilename);
                    }}
                  >
                    Save Result
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Loading isLoading={isLoading} />
      {isCompleted && <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative flex flex-col justify-center items-center bg-white rounded-lg shadow dark:bg-zinc-900 border-2 border-baseYellow">
                        <ReactTyped className="text-2xl font-bold py-4 mt-4" strings={['Loading Completed']} typeSpeed={40}/>
                        <div role="status" className="p-12 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <button class="px-3 py-1 my-5 w-[40%] font-semibold leading-none text-center rounded-full hover:scale-105 transition-all ease-in-out duration-200 dark:bg-baseYellow dark:text-black" onClick={()=>setCompleted(false)}>Close</button>
                    </div>
                </div>
            </div>}
    </div>
  );
}
