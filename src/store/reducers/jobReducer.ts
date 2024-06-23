// khởi tạo state
import { Job1 } from "../../interface/index";
// let stateJob: Job1[]=[];
// tạo hàm tính toán xử lí dựa vào các action
let stateJob: Job1[]=JSON.parse(localStorage.getItem("jobs")||"[]");
const jobReducer=(state=stateJob, action:any)=>{
    switch (action.key) {
        case "ADD_TODO":
            console.log("da vao case them cong viec", action); 
            localStorage.setItem(
                "jobs",
                JSON.stringify([...state, action.payload])
            )       
            return [...state,action.payload];
        case "UPDATE_TODO":
            console.log(11111, action);
            return [...state];
        case "DELETE":
            return state.filter((job: Job1) => job.id !== action.payload);
        case "TOGGLE_COMPLETE":
            return state.map((job: Job1) =>
                job.id === action.payload
                    ? { ...job, status: !job.status }
                    : job
            );        
        default:
            return state;
    }
}
export default jobReducer;