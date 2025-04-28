import peter_spinner from '../assets/peter_griffin.png';

const PeterGriffin = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <main className="flex justify-center items-center flex-grow">
        <div className="relative w-[90vw] h-[90vh] overflow-hidden">
          <img
            src={peter_spinner}
            className="w-full h-full object-contain rounded-xl animate-spin-slow border-none"
          />
        </div>
      </main>
    </div>
  );
};

export default PeterGriffin;