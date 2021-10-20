import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as IconName  from 'react-icons/im';
import * as Gameicons  from "react-icons/gi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/calculadora',
        icon: <Gameicons.GiGreenhouse />
    },
    {
        title: 'Data',
        path: '/data',
        icon: <FaIcons.FaDatabase />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Completa',
                path: '/data/completa',
                icon: <FaIcons.FaLayerGroup />
            },
            {
                title: 'Hum. Aire',
                path: '/data/humaire',
                icon: <FaIcons.FaCloudShowersHeavy />
            },
            {
                title: 'Hum. Tierra',
                path: '/data/humtierra',
                icon: <FaIcons.FaChartBar />
            },
            {
                title: 'temperatura',
                path: '/data/temperatura',
                icon: <FaIcons.FaTemperatureHigh />
            }
        ]

    },
    {
        title: 'Geodata',
        path: '/geodata',
        icon: <IconName.ImEarth />
    }
];
