const sortByDate = (data) => {
    return data?.length && [...data].sort((a, b) => {
        let c = new Date(a.createdAt), d = new Date(b.createdAt);
        return d - c;
    })
}
export default sortByDate;