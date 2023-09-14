import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    header: {
        flex: 10,
        justifyContent: "center"
    },

    headerTitle: {
        fontSize: 100,
        textAlign: "center"
    },

    loginBtnContainer: {
        flex: 2
    },

    loginBtn: {
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "center",
    },

    loginBtnImg: {
        width: "60%",
        resizeMode: "contain",
    },

});