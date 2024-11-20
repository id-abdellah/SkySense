import toast from "react-hot-toast";


/**
 * geolocation notifications
 */

export function geolocationErrorNotify(errorMessage) {
    toast.error(errorMessage, {
        id: "geolocation-error",
        style: {
            backgroundColor: "#A04747",
            color: "white",
            direction: "ltr"
        }
    })
}

export function geolocationSuccessNotify() {
    toast.success("Location data retrieved successfully!", {
        id: "geolocation-success",
        style: {
            backgroundColor: "#557C56",
            color: "white",
            direction: "ltr"
        }
    })
}