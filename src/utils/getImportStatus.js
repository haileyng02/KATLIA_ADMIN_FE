const getImportStatus = (statusID) => {
    switch (statusID) {
        case 1:
            return { text: "Pending", color: '#694BDB' };
        case 2:
            return { text: "Completed", color: '#32CD32' };
        case 3:
            return { text: "Canceled", color: '#FF0000' };
        default:
    }
};

export default getImportStatus;