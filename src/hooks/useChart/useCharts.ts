import { useState } from "react";

export default function useChart(){
    const [entityChart, setEntityChart] = useState();

    return [entityChart, setEntityChart]
}