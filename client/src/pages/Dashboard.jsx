import { useState } from 'react';
import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar";
import Summary from "../components/ui/Summary";
import NewTaskModal from '../components/ui/NewTaskModal';
import Tasks from "../Tasks";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false)

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
          onClose={() => setNewTaskOpen(prev => !prev)} 
        />
      )}

      <main className="lg:ml-56 p-4 sm:p-6 bg-gray-100">
        {/* welcome section */}
        <section className="flex flex-col gap-1 mb-4">
          <h1 className="font-bold text-xl sm:text-2xl">Good Morning, Ishaku</h1>
          <p className="text-[0.8rem]">You have <span className="text-blue-600">{4} tasks scheduled for today</span> and <span className="text-red-600">{1} overdue task.</span></p>
        </section> 

        {/* Summary section */}
        <Summary />

        <Tasks />
      </main>
    </div>
  );

  
}

export default Dashboard;