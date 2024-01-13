
import { useRouter } from "next/navigation";
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { ChangeEvent, useState } from "react";
import Modal from "./Modal";
function Header(props: HeaderComponent) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [items, setItems] = useState<any>({
    title: "",
    description: "",
    image: "",
    date: new Date()
  })

  const signout = async () => {
    signOut(auth).then(() => {
      router.push("/login")
    }).catch((error: any) => {
      alert(error)
    });
  }
  const resetForm = () => {
    setItems({
      title: "",
      description: "",
      image: ""
    })
  }
  const openModal = () => {
    resetForm()
    setModalIsOpen(true)
  };
  const closeModal = () => {
    resetForm()
    setModalIsOpen(false)
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updateItem = [...props.item, items]
    props.setItem(updateItem)
    closeModal();
  }


  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // The result property contains the base64-encoded data URL
        const base64String = reader.result;
        setItems({ ...items, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col py-5 bg-[rgba(35,46,82,1)]">

        <div className="flex justify-between items-center p-4">
          <a href="/" className="text-2xl text-white">Blogify</a>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={openModal}
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition duration-300"
            >
              Create Blog
            </button>
            <button
              type="button"
              onClick={signout}
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-100 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>
      <Modal isOpen={modalIsOpen} closeModal={closeModal}>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <label className="block">
            <span className="text-gray-700">Title</span>
            <input
              type="text"
              placeholder="Enter title"
              value={items.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setItems({ ...items, title: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description</span>
            <textarea
              rows={3}
              placeholder="Enter description..."
              value={items.description}
              onChange={(e: ChangeEvent<any>) => setItems({ ...items, description: e.target.value })}
              className="mt-1 p-2 border rounded-md w-full"
            ></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700">File Upload</span>
            <input type="file" className="mt-1 p-2 border rounded-md w-full" onChange={handleImageChange} />
          </label>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload item
          </button>
        </form>
      </Modal>
    </>
  );
}

Header.defaultProps = {
  tag: "👋 Rajdeep Singh",
  title: "Start your front-end developer career journey with me."
};

interface HeaderComponent {
  tag?: string;
  title?: string;
  item?: any;
  setItem?: any;
}

export default Header;
