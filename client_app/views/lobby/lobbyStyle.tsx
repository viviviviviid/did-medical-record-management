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
        fontSize: 60,
        textAlign: "left",
        marginLeft: 30
    },

    contentContainer: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        backgroundColor: "#FFF",
        height: 500,
        width: 250,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.6,
        shadowRadius: 12,
        elevation: 15,
    },

    upperCard: {
        backgroundColor: "blue",
        height: 350,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: "flex-end"
    },

    cardTitle: {
        color: "#FFF",
        marginBottom: 20,
        marginLeft: 20,
        fontSize: 30
    },

    cardText1: {
        fontSize: 15,
        color: "#666",
        marginTop: 5
    },

    cardText2: {
        fontSize: 20,
        color: "#555",
        marginTop: 5
    },


    cardTextContainer: {
        marginLeft: 20,
        marginTop: 20
    }

});