import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    header: {
        flex: 1,
        justifyContent: "center",
    },

    headerText: {
        fontSize: 40,
        textAlign: "left",
        marginLeft: 30
    },

    contentContainer: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEE"
    },

    index: {
        flexDirection: "row",
        marginLeft: 20,
        marginTop: 50,
    },

    indexText: {
        width: 100,
        fontSize: 20,
        color: "#666"
    },

    listContainer: {
        marginTop: 30,
    },

    list: {
        flexDirection: "row",
        borderRadius: 10,
        borderBottomWidth: 1,
        height: 70,
        alignItems: "center"
    },

    listText: {
        fontSize: 23,
        marginLeft: 20,
        color: "#333",
    },

    backBtn: {
        marginLeft: 30,
    },

    viewContainer: {
        flex: 6,
    },

    viewContentContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        flexDirection: "row",
    },

    viewIndexContainer: {
        flex: 2,
    },

    viewIndex: {
        fontSize: 20,
        color: "#666",
        height: 40,
        textAlign: "right"
    },

    viewInfoContainer: {
        flex: 2,
        marginLeft: 30
    },

    viewInfo: {
        fontSize: 20,
        color: "#444",
        height: 40,
    }
})