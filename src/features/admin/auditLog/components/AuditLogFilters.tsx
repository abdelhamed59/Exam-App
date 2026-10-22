import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button/button";

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

import type { IAuditLogSearchFiltersValues } from "../types/auditLog";
import { auditLogSearchFiltersSchema } from "../schemas/auditLog-schema";
import { useAuditUsers } from "../apis/queries/use-audit-users";



interface SearchFiltersProps {
  onApply: (values: { 
     category?:"DIPLOMA" | "EXAM" | "QUESTION" | "USER" | "SYSTEM"; 
     action?:"CREATE" | "UPDATE" | "DELETE" | "SET_IMMUTABLE" | "SEED_DATA";
     actorUserId?:string
   }) => void;

  onClear?: () => void;
}

export default function AuditLogFilters({ onApply, onClear }: SearchFiltersProps) {
  const form = useForm<IAuditLogSearchFiltersValues>({
    resolver: zodResolver(auditLogSearchFiltersSchema),

    defaultValues: {
        category: undefined,
        action: undefined,
        actorUserId: undefined,
    },
  });

  // --------------------------------------------------
  // User search
  // --------------------------------------------------

  const [userSearch, setUserSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --------------------------------------------------
  // Debounce User search
  // --------------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(userSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [userSearch]);

  // --------------------------------------------------
  // Get Users
  // --------------------------------------------------

  const { data, isLoading: isAuditUsersLoading } = useAuditUsers({
    page: 1,
    limit: 12,
    sortOrder: "asc",
    sortBy: "createdAt",
    search: debouncedSearch || undefined,
  });

  const users = data?.data ?? [];
  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (values: IAuditLogSearchFiltersValues) => {
    onApply({
         category: values.category || undefined,
         action: values.action || undefined,
      actorUserId: values.actorUserId || undefined,
    });
  };

  // --------------------------------------------------
  // Clear filters
  // --------------------------------------------------

  const handleClear = () => {
  form.reset({
    category: undefined,
    action: undefined,
    actorUserId: undefined,
  });

  setUserSearch("");
  setDebouncedSearch("");
  onClear?.();
};

return (
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className="flex flex-col gap-4 p-3 sm:p-4"
  >
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {/* Category */}
      <Field
        className="min-w-0 w-full"
        data-invalid={!!form.formState.errors.category}
      >
        <Controller
          control={form.control}
          name="category"
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={(value) => {
                field.onChange(value || undefined);
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-4xl border border-gray-200 bg-white px-3 text-sm text-gray-800 focus:border-blue-600 sm:h-11.5">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="DIPLOMA">Diploma</SelectItem>
                <SelectItem value="EXAM">Exam</SelectItem>
                <SelectItem value="QUESTION">Question</SelectItem>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="SYSTEM">System</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Action */}
      <Field
        className="min-w-0 w-full"
        data-invalid={!!form.formState.errors.action}
      >
        <Controller
          control={form.control}
          name="action"
          render={({ field }) => (
            <Select
              value={field.value ?? ""}
              onValueChange={(value) => {
                field.onChange(value || undefined);
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-4xl border border-gray-200 bg-white px-3 text-sm text-gray-800 focus:border-blue-600 sm:h-11.5">
                <SelectValue placeholder="Action" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="SET_IMMUTABLE">
                  Set Immutable
                </SelectItem>
                <SelectItem value="SEED_DATA">Seed Data</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* User */}
      <Field
        className="min-w-0 w-full sm:col-span-2 lg:col-span-1"
        data-invalid={!!form.formState.errors.actorUserId}
      >
        <Controller
          control={form.control}
          name="actorUserId"
          render={({ field }) => {
            const selectedUser =
              users.find((user) => user.id === field.value) ?? null;

            return (
              <Combobox
                items={users}
                value={selectedUser}
                itemToStringLabel={(user) => user?.username ?? ""}
                isItemEqualToValue={(item, value) => item.id === value.id}
                filter={null}
                onValueChange={(user) => {
                  field.onChange(user?.id ?? undefined);
                }}
                onInputValueChange={(value) => {
                  setUserSearch(value);
                }}
              >
                <ComboboxInput
                  className="h-11 w-full rounded-4xl border border-gray-200 bg-white px-3 text-sm text-gray-800 focus:border-blue-600 sm:h-11.5"
                  placeholder="User"
                />

                <ComboboxContent>
                  <ComboboxEmpty>
                    {isAuditUsersLoading
                      ? "Loading..."
                      : "No user found."}
                  </ComboboxEmpty>

                  <ComboboxList>
                    {(user) => (
                      <ComboboxItem key={user.id} value={user}>
                        {user.username}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            );
          }}
        />

        {form.formState.errors.actorUserId && (
          <p className="text-xs text-red-500 sm:text-sm">
            {form.formState.errors.actorUserId.message}
          </p>
        )}
      </Field>
    </div>

    {/* Buttons */}
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
      <Button
        className="w-full px-6 font-mono text-sm sm:w-auto sm:px-9"
        type="button"
        variant="ghost"
        onClick={handleClear}
      >
        Clear
      </Button>

      <Button
        className="w-full px-6 font-mono text-sm sm:w-auto sm:px-9"
        variant="secondary"
        type="submit"
      >
        Apply
      </Button>
    </div>
  </form>
);

}
