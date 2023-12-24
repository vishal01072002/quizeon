
export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] border-4 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-400 bg-gray-600 p-6">
        <p className="text-2xl font-semibold text-gray-50">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-gray-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <button type="button" className="text-white bg-red-600 py-[8px] px-[20px] rounded-md" onClick={modalData?.btn1Handler}>
            {modalData?.btn1Text}
          </button>
          <button
            className="cursor-pointer rounded-md bg-gray-200 py-[8px] px-[20px] font-semibold text-gray-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
