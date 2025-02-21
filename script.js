Hooks.on("createChatMessage", async (message) => {
    if (!message.isRoll || !message.rolls || message.rolls.length === 0) return;

    let roll = message.rolls[0];

    // Verifica se a rolagem foi um d20 e se houve um 1
    if (roll.dice[0]?.faces === 20 && roll.dice[0].results.some(r => r.result === 1)) {
        // Nome exato da tabela no Foundry
        let tableName = "Falha Crítica";  // Altere para o nome exato da sua tabela

        // Obtém a tabela pelo nome
        let table = game.tables.getName(tableName);

        if (table) {
            // Rola a tabela e obtém o resultado
            const result = await table.draw();
            const user = game.users.get(message.user.id);
            const playerName = user.name; // Nome do jogador

            // Mensagem a ser enviada para todos
            const content = `${playerName} rolou 1! Resultado da Tabela: ${result}`;

            // Envia a mensagem para todos no chat
            await ChatMessage.create({
                content: content,
                whisper: []  // Enviar para todos
            });
        } else {
            ui.notifications.error(`Tabela '${tableName}' não encontrada!`);
        }
    }
});
