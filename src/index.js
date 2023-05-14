import { config } from 'dotenv';
import { Client, GatewayIntentBits, MessageFlags, Routes, AttachmentBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { get_exp } from "./get_exp.js";
import { join_dao } from './join_dao.js';
import { is_member } from './is_member.js'
import canvacord from 'canvacord';
import { create_proposal } from './create_proposal.js';
import { check_proposal } from './check_proposal.js';
import { check_vote_again } from './check_vote_again.js';
import { check_vote_for } from './check_vote_for.js';
import { vote } from './vote.js';
import { withdraw } from './with_draw.js';
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const rest = new REST ({ version: '10'}).setToken(process.env.TOKEN);

client.on('ready',() => {
    console.log("bot has logged in" + client.user.tag);
})


client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
        console.log(`hello world`);
        if (interaction.commandName === 'checklevel') {
            async function main2() {
                // console.log(interaction.user.id);
                const privateKey = interaction.options.data[0].value;
                console.log(interaction.options.data[0].value);
                const memberExp = await get_exp(privateKey);

                const level = Math.floor(memberExp / 100) +1;
                console.log(level);
                // const memberExpFinal = Math.floor(memberExp % 100)+1;
                // console.log("memberExpFinal" + memberExpFinal);
                // memberExp = memberExp%100;
                // console.log('Member eexp:', memberExp);
                // interaction.reply({ content: `Hey there! The member experience is ${memberExp}`});
                const rank = new canvacord.Rank()
                .setAvatar(img)
                .setLevel(level)
                .setCurrentXP(memberExp)
                .setRequiredXP(100)
                .setStatus("dnd")
                .setProgressBar("#FFFFFF", "COLOR")
                .setUsername(interaction.user.username)
                .setDiscriminator(interaction.user.discriminator);
                rank.build()
                .then(data => {
                    const attachment = new AttachmentBuilder(data);
                    interaction.reply({files:[attachment]});
                });
            }

            // Call the main function
            main2();
            
        }
        if (interaction.commandName === 'joindao') {
            async function main3() {
                // console.log(interaction.user.id);
                const privateKey = interaction.options.data[0].value;
                
                // await interaction.reply({ content: `haha`, ephemeral: true});
                await interaction.deferReply({ ephemeral: true });
                const response2 = await join_dao(privateKey);   
                console.log(response2);
                interaction.editReply(response2);
            }
            main3();
        }
        if (interaction.commandName === 'ismember') {
            async function main4() {
                // console.log(interaction.user.id);
                const private_key = interaction.options.data[0].value;
                await interaction.deferReply({ ephemeral: true });
                const response = await is_member(private_key);
                console.log(response);
                if (response) {
                    interaction.editReply("You Are DAO member");
                } else {
                    interaction.editReply("You are not DAO member, type /joindao to join");
                }
            }
            main4();
        }
        if (interaction.commandName === 'createproposal') {
            async function main4() {
                // console.log(interaction.user.id);
                const private_key = interaction.options.data[0].value;
                const description = interaction.options.data[1].value;
                const duration = interaction.options.data[2].value;
                await interaction.deferReply({ ephemeral: true });
                const response = await create_proposal(private_key,description,duration);
                console.log(response);
                interaction.editReply(response);
            }
            main4();
        }
        if (interaction.commandName === 'checkproposal') {
            async function main4() {
                // console.log(interaction.user.id);
                const private_key = interaction.options.data[0].value;
                const proposalId = interaction.options.data[1].value;
                await interaction.deferReply({ ephemeral: true });
                const vote_for = await check_vote_for(private_key,proposalId); 
                const vote_again = await check_vote_again(private_key,proposalId);
                const response = await check_proposal(private_key,proposalId);
                const response2 = `description: ${response}, Vote for: ${vote_for}, Vote again: ${vote_again}`;
                interaction.editReply(response2);
                // interaction.editReply('f');
            }
            main4();
        }
        if (interaction.commandName === 'vote') {
            async function main4() {
                // console.log(interaction.user.id);
                const private_key = interaction.options.data[0].value;
                const proposalId = interaction.options.data[1].value;
                const choice = interaction.options.data[2].value;
                const amount = interaction.options.data[3].value;
                await interaction.deferReply({ ephemeral: true });

                const response = await vote(private_key,proposalId,choice,amount);
                
                interaction.editReply(response);
                // interaction.editReply('f');
            }
            main4();
        }
        if (interaction.commandName === 'withdraw') {
            async function main4() {
                // console.log(interaction.user.id);
                const private_key = interaction.options.data[0].value;
                const proposalId = interaction.options.data[1].value;
                await interaction.deferReply({ ephemeral: true });

                const response = await withdraw(private_key,proposalId);
                
                interaction.editReply(response);
                // interaction.editReply('f');
            }
            main4();
        }
    }
});

async function main() {
    const commands = [
        {
            name: 'checklevel',
            description: 'Check your level',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            }]
        },
        {
            name: 'joindao',
            description: 'Join DAO',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            }]
        },
        {
            name: 'ismember',
            description: 'Are you member of DAO ?',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            }]
        },
        {
            name: 'createproposal',
            description: 'Create new proposal',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            },
            {
                name: 'description',
                description: 'proposal description',
                type: 3,
                required: true,
            },
            {
                name: 'duration',
                description: 'Duration (day)',
                type: 3,
                required: true,
            }]
        },
        {
            name: 'checkproposal',
            description: 'check proposal detail',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            },
            {
                name: 'proposalid',
                description: 'proposal id',
                type: 3,
                required: true,
            }]
        },
        {
            name: 'vote',
            description: 'vote proposal',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            },
            {
                name: 'proposalid',
                description: 'proposal id',
                type: 3,
                required: true,
            },
            {
                name: 'choice',
                description: 'true -> vote for, false -> vote again ',
                type: 5,
                required: true,
            },
            {
                name: 'amount',
                description: 'amount of vote',
                type: 3,
                required: true,
            }]
        },
        {
            name: 'withdraw',
            description: 'withdraw reward',
            options: [{
                name: 'private_key',
                description: 'your private key',
                type: 3,
                required: true,
            },
            {
                name: 'proposalid',
                description: 'proposal id',
                type: 3,
                required: true,
            }]
        },

    ];
    try {
        console.log("start");
        await rest.put (Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
            body: commands,
        });
        client.login(process.env.TOKEN);
    } catch(err) {
        console.log(err);
    }
} 

main();