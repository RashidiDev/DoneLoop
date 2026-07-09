import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { categoriesType } from "@/lib/types";

function TasksCategory({
  taskCategoryHandler,
}: {
  taskCategoryHandler: (taskFilter: categoriesType) => void;
}) {
  return (
    <Select
      defaultValue="all"
      onValueChange={v => {
        taskCategoryHandler(v as categoriesType);
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Filter tasks by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="uncompleted">Uncompleted</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default TasksCategory;
