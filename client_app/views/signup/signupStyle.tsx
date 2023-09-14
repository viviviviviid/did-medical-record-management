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
        fontSize: 50,
        textAlign: "center",
    },

    contentContainer: {
        flex: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    inputName: {
        height: 60,
        width: 300,
        margin: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#BBB",
        padding: 10,
    },

    title: {
        marginTop: 20,
        fontSize: 30,
        marginBottom: 10,
    },

    font: {
        fontSize: 15,
        color: "#666",
    },

    checkBox: {
        marginTop: 0,
        marginRight: 20,
    },

    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },

    btn: {
        marginTop: 50,
        marginBottom: 80
    },

    loading: {
        height: 800,
        justifyContent: "center",
        alignItems: "center"
    },

    loadingText: {
        fontSize: 20,
        marginBottom: 30,
    },

    email: {
        fontSize: 20,
        color: "#444",
        marginTop: 5,
        marginBottom: 5,
    },

    errMsg: {
        marginTop: 10,
        fontSize: 20,
        color: "red"
    }
});