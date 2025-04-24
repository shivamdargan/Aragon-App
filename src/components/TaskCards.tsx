import { FC } from 'react';

interface TaskCardProps {
  title: string;
  completedSubtasks: number;
  totalSubtasks: number;
}

const TaskCard: FC<TaskCardProps> = ({ title, completedSubtasks, totalSubtasks }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-xs text-gray-500">
        {completedSubtasks} of {totalSubtasks} subtasks
      </p>
    </div>
  );
};

export default TaskCard;
