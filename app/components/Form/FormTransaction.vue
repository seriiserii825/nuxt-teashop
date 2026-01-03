<script setup lang="ts">
const form = ref({
  title: "",
  amount: 0,
  category_id: null as number | null,
  type: "",
});

const select_options = ref([
  { name: "Food", id: 1 },
  { name: "Transport", id: 2 },
  { name: "Shopping", id: 3 },
]);

function onFormSubmit() {
  console.log(form.value);
}
</script>

<template>
  <div class="shape">
    <Form
      v-slot="$form"
      class="flex flex-col justify-center gap-4"
      @submit="onFormSubmit"
    >
      <div class="flex flex-col gap-1">
        <label for="title" class="label">Title: </label>
        <InputText
          id="title"
          v-model="form.title"
          name="form_title"
          type="text"
          placeholder="Title"
        />
        <Message
          v-if="$form.title?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.title.error?.message }}</Message
        >
      </div>
      <div class="flex justify-between gap-4">
        <div class="flex w-1/2 flex-col gap-1">
          <label for="amount" class="label">Amount: </label>
          <InputNumber
            id="amount"
            v-model="form.amount"
            name="form_amount"
            placeholder="Amount"
            fluid
            mode="currency"
            currency="USD"
            locale="en-US"
          />
          <Message
            v-if="$form.amount?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.amount.error?.message }}</Message
          >
        </div>
        <div class="flex w-1/2 flex-col gap-1">
          <label for="category" class="label">Category: </label>
          <Select
            id="category"
            v-model="form.category_id"
            name="category"
            :options="select_options"
            option-label="name"
            placeholder="Select a Category"
            fluid
          />
          <Message
            v-if="$form.category_id?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.category_id.error?.message }}</Message
          >
        </div>
      </div>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="form.type"
            input-id="ingredient1"
            name="type"
            value="Income"
          />
          <label for="ingredient1">Income</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton
            v-model="form.type"
            input-id="ingredient2"
            name="type"
            value="Expense"
          />
          <label for="ingredient2">Expense</label>
        </div>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
