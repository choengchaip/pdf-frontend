<template>
  <div class="w-full flex flex-col h-full">
    <div class="w-5/6 md:w-4/6 xl:w-2/6 mx-auto flex-grow flex flex-col justify-center">
      <h1 class="text-4xl mb-16 font-bold text-center">Upload PDF File</h1>
      <InputText
          :isRequired="true"
          label="File Name"
          placeholder="File Name"
          v-model="fileName"/>
      <InputUpload
          :isRequired="true"
          label="Upload Your File"
          placeholder="Upload Your File"
          v-model="file"/>
      <InputDropdown
          :isRequired="true"
          label="Select Approver"
          placeholder="Select Approver"
          :options="getOptions()"
          v-model="approverID"/>
      <div>
        <label>Expire At</label>
        <VueCtkDateTimePicker
            style="margin-top: 4px;"
            label="Expire date"
            title="Expire date"
            locale="en"
            format="YYYY-MM-DDThh:mm:ss+07:00"
            v-model="expireAt"/>
      </div>
      <Button
          @click="onClick"
          :isLoading="uploadLoader.uploadStatus.isLoading"
          className="mt-16"
          title="Submit Form"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Base from "~/core/base";
import InputText from "~/components/InputText.vue";
import Button from "~/components/Button.vue";
import InputUpload from "~/components/InputUpload.vue";
import InputDropdown from "~/components/InputDropdown.vue";
import {PageLoader} from "~/loader/page";
import Config from "~/core/config";

@Component({
  components: {InputDropdown, InputUpload, Button, InputText}
})
export default class UploadPDF extends Base {
  fileName: string = ''
  file: File | null = null
  approverID: string = ''
  expireAt: any = null

  created() {
    this.userLoader.initial()
  }

  mounted() {
    this.userLoader.$fetch()
  }

  onClick() {
    this.uploadLoader.$upload({
      file_name: this.fileName,
      file: this.file,
      approver_id: this.approverID,
      expire_at: this.expireAt
    })
  }

  getOptions(): { label: string, value: string }[] {
    return this.userLoader.fetchItems.map((user) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.user_id
    }))
  }

  get userLoader(): PageLoader<{ user_id: string, first_name: string, last_name: string }> {
    return new PageLoader(this, (data: any) => ({
      baseURL: Config.BASE_API('/users')
    }))
  }

  get uploadLoader(): PageLoader {
    return new PageLoader(this, (data: any) => ({
      baseURL: Config.BASE_API('/upload-pdf'),
      onUploadSuccess: (newValue) => {
        this.$toast.success('Upload PDF Success!!').goAway(1000)
        this.fileName = ''
        this.file = null
        this.approverID = ''
        this.expireAt = null
      },
      onUploadError: (newValue) => {
        this.$toast.error('Upload PDF Error!!').goAway(1000)
      }
    }))
  }
}
</script>

<style lang="scss" scoped>
</style>