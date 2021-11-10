export default {
    name: 'note-txt',
    props: ['info'],
    template: `
        <div class="row">
            <p>{{ info.txt }}</p>
        </div>
    `,
    created() {
        console.log(this.info);
    }
}