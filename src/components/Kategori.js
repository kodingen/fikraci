import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function Kategori(props) {
    return (
        <TouchableOpacity style={[styles.container, props.style]}>
            <Text style={styles.t2}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0,162,209,1)",
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
        minWidth: 40,
        minHeight: 40,
        borderRadius: 28,
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowColor: "#111",
        shadowOpacity: 0.2,
        shadowRadius: 1.2
    },
    t2: {
        color: "rgba(255,255,255,1)",
        fontSize: 50,
        fontFamily: "sniglet-regular",
        marginTop: 6,
        alignSelf: "center"
    }
});

export default MaterialButtonShare;
