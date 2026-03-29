import Foundation
import SwiftData

@Observable
class FoodLogViewModel {
    var selectedDate: Date = Date()
    var entries: [FoodEntry] = []

    func loadEntries(context: ModelContext) {
        let startOfDay = selectedDate.startOfDay
        let endOfDay = selectedDate.endOfDay
        let descriptor = FetchDescriptor<FoodEntry>(
            predicate: #Predicate { entry in
                entry.timestamp >= startOfDay && entry.timestamp <= endOfDay
            },
            sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
        )
        entries = (try? context.fetch(descriptor)) ?? []
    }

    func addEntry(
        name: String,
        calories: Int,
        protein: Double,
        carbs: Double,
        fat: Double,
        servingSize: String,
        imageData: Data?,
        context: ModelContext
    ) {
        let entry = FoodEntry(
            name: name,
            calories: calories,
            protein: protein,
            carbs: carbs,
            fat: fat,
            servingSize: servingSize,
            imageData: imageData,
            timestamp: selectedDate.isToday ? Date() : selectedDate
        )
        context.insert(entry)
        try? context.save()
        loadEntries(context: context)
    }

    func deleteEntry(_ entry: FoodEntry, context: ModelContext) {
        context.delete(entry)
        try? context.save()
        loadEntries(context: context)
    }

    var totalCalories: Int {
        entries.reduce(0) { $0 + $1.calories }
    }
}
