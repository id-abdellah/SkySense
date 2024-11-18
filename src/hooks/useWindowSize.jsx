import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [size, setSize] = useState(window.innerWidth)

    useEffect(() => {
        window.onresize = () => {
            setSize(window.innerWidth)
        }
    }, [])

    return size
}