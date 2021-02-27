import {Vue} from "vue-property-decorator";
import AppRepository from "~/repositories/AppRepository";
import {Toasted} from "vue-toasted";

export default class Base extends Vue {
    $app!: AppRepository
    $toast!: Toasted
}