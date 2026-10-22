import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

import { Field } from "@/components/ui/field";

import { useAdminDiplomas } from "@/features/admin/diploma/apis/queries/use-admin-diplomas";

import type { examSearchFiltersValues } from "../../types/admin-exam";

import { examSearchFiltersSchema } from "../../schemas/adminExam-schema";

interface SearchFiltersProps {
  onApply: (values: { search?: string; immutable?: boolean; diplomaId?: string }) => void;

  onClear?: () => void;
}

export default function ExamSearchFilters({ onApply, onClear }: SearchFiltersProps) {
  const form = useForm<examSearchFiltersValues>({
    resolver: zodResolver(examSearchFiltersSchema),

    defaultValues: {
      search: "",
      immutable: "None",
      diplomaId: "",
    },
  });

  // --------------------------------------------------
  // Diploma search
  // --------------------------------------------------

  const [diplomaSearch, setDiplomaSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --------------------------------------------------
  // Debounce diploma search
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(diplomaSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [diplomaSearch]);

  // --------------------------------------------------
  // Get diplomas
  // --------------------------------------------------

  const { data, isLoading: isDiplomasLoading } = useAdminDiplomas({
    page: 1,
    limit: 12,
    sortBy: "title",
    sortOrder: "asc",
    search: debouncedSearch || undefined,
  });

  const diplomas = data?.data ?? [];

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (values: examSearchFiltersValues) => {
    onApply({
      search: values.search || undefined,

      immutable: values.immutable === "None" ? undefined : values.immutable === "Immutable",

      diplomaId: values.diplomaId || undefined,
    });
  };

  // --------------------------------------------------
  // Clear filters
  // --------------------------------------------------

  const handleClear = () => {
    form.reset({
      search: "",
      immutable: "None",
      diplomaId: "",
    });

    setDiplomaSearch("");

    setDebouncedSearch("");

    onApply({
      search: undefined,
      immutable: undefined,
      diplomaId: undefined,
    });

    onClear?.();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2.5 p-4">
      {/* =========================
          Search
      ========================== */}

      <Field data-invalid={!!form.formState.errors.search}>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-gray-400" />

          <Input id="search" placeholder="Search by title" className="pr-10" {...form.register("search")} />
        </div>

        {form.formState.errors.search && <p className="text-sm text-red-500">{form.formState.errors.search.message}</p>}
      </Field>

      {/* =========================
          Filters
      ========================== */}

      <div className="flex gap-2.5">
        {/* =========================
            Immutable
        ========================== */}

        <Field className="w-full sm:w-81.5" data-invalid={!!form.formState.errors.immutable}>
          <Controller
            control={form.control}
            name="immutable"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11.5 w-full rounded-4xl border border-gray-200 bg-white p-2.5 text-gray-800 focus:border-blue-600 sm:w-81.5">
                  <SelectValue placeholder="Immutability" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="None">None</SelectItem>

                  <SelectItem value="Immutable">Immutable</SelectItem>

                  <SelectItem value="Mutable">Mutable</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        {/* =========================
            Diploma
        ========================== */}

        <Field className="w-full sm:w-81.5" data-invalid={!!form.formState.errors.diplomaId}>
          <Controller
            control={form.control}
            name="diplomaId"
            render={({ field }) => {
              const selectedDiploma = diplomas.find((d) => d.id === field.value) ?? null;

              return (
                <Combobox
                  items={diplomas}
                  value={selectedDiploma}
                  itemToStringLabel={(d) => d?.title ?? ""}
                  isItemEqualToValue={(item, value) => item.id === value.id}
                  filter={null}
                  onValueChange={(diploma) => {
                    field.onChange(diploma?.id ?? "");
                  }}
                  onInputValueChange={(value) => {
                    setDiplomaSearch(value);
                  }}
                >
                  <ComboboxInput
                    className="h-11.5 w-full rounded-4xl border border-gray-200 bg-white p-2.5 text-gray-800 focus:border-blue-600 sm:w-81.5"
                    placeholder="Diploma"
                  />

                  <ComboboxContent>
                    <ComboboxEmpty>{isDiplomasLoading ? "Loading..." : "No diploma found."}</ComboboxEmpty>

                    <ComboboxList>
                      {(diploma) => (
                        <ComboboxItem key={diploma.id} value={diploma}>
                          {diploma.title}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              );
            }}
          />

          {form.formState.errors.diplomaId && (
            <p className="text-sm text-red-500">{form.formState.errors.diplomaId.message}</p>
          )}
        </Field>
      </div>

      {/* =========================
          Buttons
      ========================== */}

      <div className="flex items-center justify-end gap-2.5">
        <Button className="px-9 font-mono text-sm font-medium" type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>

        <Button className="px-9 font-mono text-sm font-medium" variant="secondary" type="submit">
          Apply
        </Button>
      </div>
    </form>
  );
}
