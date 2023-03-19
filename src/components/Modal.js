function Modal({ videoSrc, closeModal }) {
  return (
    <div className="w-full h-full fixed top-0 left-0 z-[1000] bg-black/90">
      <button
        onClick={closeModal}
        className="text-5xl  text-white absolute top-[50px] right-[50px] hover:text-red-700"
      >
        x
      </button>

      <div className="flex w-full justify-center items-center h-full">
        <iframe
          width="660"
          height="415"
          src={`https://www.youtube.com/embed/${videoSrc}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}

export default Modal;
