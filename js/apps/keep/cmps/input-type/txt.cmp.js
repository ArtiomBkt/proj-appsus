export default {
    name: 'note-txt',
    props: ['info'],
    template: `
        <div>
            <p class="note-body">{{ info.txt }}</p>
        </div>
    `,
}