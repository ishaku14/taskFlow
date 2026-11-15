import { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { useAuthStore } from '../stores/authStore';
import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar";
import Summary from "../components/ui/Summary";
import NewTaskModal from '../components/ui/NewTaskModal';
import Tasks from "../Tasks";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const user = useAuthStore(state => state.user);

  const handleStatusChange = async (taskId, newStatus) => {
    const oldStatus = tasks.find(task => task.id === taskId).status;

    setTasks(current => current.map(task => (
      task.id === taskId ? { ...task, status: newStatus } : task
    )));

    try {
      await api.patch(`/task/${taskId}/status`, { status: newStatus });
    } catch (err) {
      setTasks(current => current.map(task => (
        task.id === taskId ? { ...task, status: oldStatus } : task
      )));
      console.error(err.response?.data || err.message);
    }

  }

  useEffect(() => {
    // Fetch tasks from the API and update the state
    const fetchTasks = async () => {
      try {
        const res = await api.get("/task");
        setTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    }

    fetchTasks();
  }, []);

  return(
    <div className=" bg-gray-100">
      <Header 
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
        onNewTaskClick={() => setNewTaskOpen(prev => !prev)}
      />

      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {newTaskOpen && (
        <NewTaskModal
          setTasks={setTasks}
          onClose={() => setNewTaskOpen(prev => !prev)} 
        />
      )}

      <main className="lg:ml-56 p-4 sm:p-6 bg-gray-100">
        {/* welcome section */}
        <section className="flex flex-col gap-1 mb-4">
          <h1 className="font-bold text-xl sm:text-2xl">Welcome back, {user?.name}</h1>
          {/* <p className="text-[0.8rem]">You have <span className="text-blue-600">{4} tasks scheduled for today</span> and <span className="text-red-600">{1} overdue task.</span></p> */}
        </section> 

        {/* Summary section */}
        <Summary tasks={tasks} />

        <Tasks tasks={tasks} onStatusChange={handleStatusChange} />
      </main>
    </div>
  );

  
}

export default Dashboard;