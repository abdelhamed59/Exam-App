import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {diplomaSearchFiltersSchema} from "../../schemas/adminDiploma-schema";
import { Field } from "@/components/ui/field";
import type { DiplomaSearchFiltersValues } from "../../types/admin-diploma";

interface SearchFiltersProps {
  onApply: (values: {
    search?: string;
    immutable?: boolean;
  }) => void;

  onClear?: () => void;
}

export default function DiplomaSearchFilters({
  onApply,
  onClear,
}: SearchFiltersProps) {
  const form = useForm<DiplomaSearchFiltersValues>({
    resolver: zodResolver(diplomaSearchFiltersSchema),

    defaultValues: {
      search: "",
      immutable: "None",
    },
  });

  const handleSubmit = (values: DiplomaSearchFiltersValues) => {
    onApply({
      search: values.search || undefined,

      immutable:
        values.immutable === "None"
          ? undefined
          : values.immutable === "Immutable",
    });
  };

  const handleClear = () => {
    form.reset({
      search: "",
      immutable: "None",
    });

    onApply({
      search: undefined,
      immutable: undefined,
    });

    onClear?.();
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="p-4 flex flex-col gap-2.5"
    >
      {/* Search */}

      <Field  data-invalid={!!form.formState.errors.search}>
        <div className="relative">
          <Search
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />

          <Input
            id="search"
            placeholder="Search by title"
            className="pr-10"
            {...form.register("search")}
          />
        </div>

        {form.formState.errors.search && (
          <p className="text-sm text-red-500">
            {form.formState.errors.search.message}
          </p>
        )}
      </Field>

      {/* Immutable */}

      <Field data-invalid={!!form.formState.errors.immutable}>
        <Controller
          control={form.control}
          name="immutable"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger  className="w-full  sm:w-81.5 h-11.5 rounded-4xl border border-gray-200 bg-white p-2.5  text-gray-800  focus:border-blue-600  ">
                <SelectValue placeholder="Immutability" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="None">
                  None
                </SelectItem>

                <SelectItem value="Immutable">
                  Immutable
                </SelectItem>

                <SelectItem value="Mutable">
                  Mutable
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2.5">
        <Button className="px-9 font-mono font-medium text-sm"
          type="button"
          variant="ghost"
          onClick={handleClear}
        >
          Clear
        </Button>

        <Button
          className="px-9 font-mono font-medium text-sm"
          variant="secondary"
          type="submit"
        >
          Apply
        </Button>
      </div>
    </form>
  );
}