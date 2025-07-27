import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export const CreateContentModel = ({ open, onClose }) => {
  return (
    <div>
      {open && (
        <div className="bg-slate-200 w-screen h-screen top-0 left-0 fixed opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-lg">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div>
                <Input placeholder="Enter title" />
                <Input placeholder="Link" />
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({ onChange, placeholder }: { onChange: () => void }) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-4 py-2 border rounded-md m-2"
        onChange={onChange}
      />
    </div>
  );
};
