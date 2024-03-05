import LZString from "lz-string";
export const getDataUserLoca = () => {
  //lấy data user từ loca
  const decodedDataLoace =
    localStorage.getItem("data") == null
      ? null
      : JSON.parse(LZString.decompressFromBase64(localStorage.getItem("data")))
        .data;
  return decodedDataLoace;
};
