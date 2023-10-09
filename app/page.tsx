import ClientOnly from "./components/ClientOnly";
import {Reservations} from "@/app/components/reservation/Reservations";
import {Tables} from "@/app/components/tables/Tables";
import Container from "@/app/components/Container";
import React from "react";
import {DateSelectionBar} from "@/app/components/DateSelectionBar";


const Home = async () => {

    return (
        <ClientOnly>
            <Container>
                <DateSelectionBar />
                <Reservations />
                <Tables />
            </Container>
        </ClientOnly>
    )
}

export default Home;
