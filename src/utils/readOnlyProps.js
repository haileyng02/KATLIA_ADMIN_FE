import ReadOnlySuffix from "../components/ReadOnlySuffix";

const getReadOnlyProps = (readOnly) => {
    return {
        readOnly: readOnly,
        suffix: readOnly ? <ReadOnlySuffix /> : null,
    }
}

export default getReadOnlyProps;