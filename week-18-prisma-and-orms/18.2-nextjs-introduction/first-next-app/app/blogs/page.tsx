import axios from "axios";

const getBlogs = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  console.log(response.data);
  return response.data;
};

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div>
      {blogs.map((blog: TodoProps, index: number) => (
        <Todo key={index} title={blog.title} completed={blog.completed} />
      ))}
    </div>
  );
}

interface TodoProps {
  title: string;
  completed: boolean;
}

const Todo = ({ title, completed }: TodoProps) => {
  return (
    <div>
      {title} {completed ? "done" : "not done"}
    </div>
  );
};
