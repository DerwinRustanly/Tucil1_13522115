import { ReactTyped } from "react-typed";
import { useState, useEffect } from "react";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [reward, setReward] = useState(null);
  const [duration, setDuration] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [resultBarOpen, setResultBarOpen] = useState(false);
  const [sequences, setSequences] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      setUploadedFileName(file.name);
    } else {
      setUploadedFileName("No File Uploaded");
    }
  }, [file]);

  useEffect(() => {
    console.log("sequences: ")
    console.log(sequences)
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
  }, [matrix, buffer, reward, coordinates, duration, height, width]);

  const handleUpload = async () => {
    try {
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
      // Handle successful upload
    } catch (error) {
      // Handle error
    }
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
              {sequences.map((sequence, i) =>{
              return(
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
                )}
              )}
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
                  {`${index + 1}. (${coordinate[1]+1},${coordinate[0]+1})`}
                </div>
              ))}
            </div>
            <p>
              <span className="px-4 py-2 font-bold">Duration:</span> {duration}{" "}
              ms
            </p>
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
    </div>
  );
}
